import { writable, derived } from "svelte/store";
import {
  randomColor,
  randomPick,
  formatScore,
  calcScore,
  getMonth
} from "./utils";
import { alphabets, emojis } from "./data";

const initialGame = {
  cards: [],
  first: { key: null, index: null },
  removed: 0,
  totalCards: 0,
  startTime: 0,
  endTime: 0,
  completedSeconds: 0,
  score: 0,
  formattedScore: "",
  moves: 0,
  leaderBoard: {},
  newLeaderBoardEntry: { month: null, rank: { name: null, score: null } },
  myRanking: null
};

const data = writable({
  gameState: "INITIAL",
  game: initialGame,
  cardColor: { a: 0, b: 0, c: 0, p: "" }
});

const newGame = (mode, num) => {
  let picked;
  if (mode === "EMOJI") {
    picked = randomPick(emojis, num / 2).reduce(
      (result, el, index) =>
        result.concat([
          {
            key: index.toString(),
            word: el,
            flipped: false,
            removed: false
          },
          {
            key: index.toString(),
            word: el,
            flipped: false,
            removed: false
          }
        ]),
      []
    );
  } else {
    picked = randomPick(alphabets, num / 2).reduce(
      (result, el) =>
        result.concat([
          { key: el, word: el, flipped: false, removed: false },
          {
            key: el,
            word: el.toUpperCase(),
            flipped: false,
            removed: false
          }
        ]),
      []
    );
  }
  data.update(old => ({
    ...old,
    game: {
      ...initialGame,
      totalCards: num,
      cards: randomPick(picked, picked.length)
    },
    gameState: "PLAYING",
    cardColor: randomColor()
  }));
};

const handleCardClick = (index, key) => {
  data.update(old => {
    const newStore = { ...old };
    if (newStore.game.startTime === 0) newStore.game.startTime = Date.now();
    if (!newStore.game.first.key) {
      // first pick!
      newStore.game.first = { key, index };
    } else {
      newStore.game.moves++;
      // second pick and match!
      if (newStore.game.first.key === key) {
        // if completed.
        if (newStore.game.totalCards === newStore.game.removed + 2) {
          newStore.gameState = "COMPLETED";
          const finishedTime = Date.now();
          newStore.game.endTime = finishedTime;
          newStore.game.completedSeconds =
            (finishedTime - newStore.game.startTime) / 1000;
          newStore.game.score = calcScore(
            newStore.game.totalCards,
            newStore.game.moves,
            newStore.game.completedSeconds
          );
          newStore.game.formattedScore = formatScore(newStore.game.score);
          return { ...newStore };
        }
        // if not completed.
        newStore.game.cards[newStore.game.first.index].flipped = true;
        newStore.game.cards[newStore.game.first.index].removed = true;
        newStore.game.cards[index].flipped = true;
        newStore.game.cards[index].removed = true;
        newStore.game.first = { key: null, index: null };
        newStore.game.removed += 2;
      } else {
        // second pick and not match!
        newStore.game.cards[newStore.game.first.index].flipped = false;
        newStore.game.cards[index].flipped = false;
        newStore.game.first = { key: null, index: null };
      }
    }
    return { ...newStore };
  });
};
const fetchLeaderboard = async totalCards => {
  try {
    const response = await fetch(
      `https://ig-match-cards.firebaseio.com/leader-board/t${totalCards}.json`
    );
    let resData = await response.json();
    let newDataForServer = null;
    data.update(old => {
      const newStore = { ...old };
      newStore.gameState = "LEADER_BOARD";
      if (!newStore.game.newLeaderBoardEntry.rank.name) {
        // skipping register name
        !resData || resData.month !== getMonth(new Date())
          ? (newStore.game.leaderBoard = {
              month: getMonth(new Date()),
              ranks: [{ name: "", score: 0 }]
            })
          : (newStore.game.leaderBoard = {
              month: getMonth(new Date()),
              ranks: [...resData.ranks.slice(0, 10)]
            });
        return { ...newStore };
      } else if (
        !resData ||
        resData.month !== getMonth(newStore.game.newLeaderBoardEntry.date)
      ) {
        // no data from server or new month
        newStore.game.leaderBoard = {
          month: getMonth(newStore.game.newLeaderBoardEntry.date),
          ranks: [newStore.game.newLeaderBoardEntry.rank]
        };
        newDataForServer = { ...newStore.game.leaderBoard };
        return { ...newStore };
      } else {
        // existing server data and a new record
        const myIndex = resData.ranks.findIndex(
          item => item.score < newStore.game.newLeaderBoardEntry.rank.score
        );
        myIndex === -1
          ? (newStore.game.myRanking = resData.ranks.length + 1)
          : (newStore.game.myRanking = myIndex + 1);
        newDataForServer = {
          ...resData,
          ranks: [
            ...resData.ranks.slice(0, newStore.game.myRanking - 1),
            newStore.game.newLeaderBoardEntry.rank,
            ...resData.ranks.slice(
              newStore.game.myRanking - 1,
              resData.ranks.length
            )
          ]
        };
        newStore.game.leaderBoard =
          newStore.game.myRanking < 11
            ? { ...resData, ranks: newDataForServer.ranks.slice(0, 10) }
            : {
                ...resData,
                ranks: newDataForServer.ranks
                  .slice(0, 10)
                  .concat(newStore.game.newLeaderBoardEntry.rank)
              };
        return { ...newStore };
      }
    });
    if (newDataForServer)
      fetch(
        `https://ig-match-cards.firebaseio.com/leader-board/t${totalCards}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newDataForServer)
        }
      );
  } catch (error) {
    console.log(error);
  }
};

export default {
  subscribe: data.subscribe,
  set: data.set,
  update: data.update,
  newGame,
  handleCardClick,
  fetchLeaderboard,
  formatScore
};
