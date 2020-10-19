import { writable, get } from "svelte/store";
import {
  pickRandomRange,
  pickRandomWithAnswer,
  getAnswer,
  makeQuestionScreen,
  speak
} from "./utils";
import { timeStart, timeAdd, timePause, timeResume } from "./time";
import { levels } from "./levels";

const initialStore = {
  clickTimer: null
};
const resetableStore = {
  status: "INITIAL",
  currentStage: 0,
  levelCap: levels.length - 1,
  score: 0,
  point: 0,
  questions: [],
  qScreen: [],
  answers: [],
  answerClicked: [],
  correctAnswer: null,
  correctIndex: null,
  qStart: 0,
  exp: 0,
  canClick: true
};

export const store = writable({ ...initialStore, ...resetableStore });

export const generateQuestion = () => {
  store.update(old => {
    const n = { ...old };
    const level = levels[n.currentStage];
    n.questions = [...Array(level.question.length)].reduce(
      (result, item, index) => {
        return result.concat(
          ...pickRandomRange(
            1,
            level.question[index].min,
            level.question[index].max
          )
        );
      },
      []
    );
    n.qScreen = makeQuestionScreen(n.questions);
    n.correctAnswer = getAnswer(n.questions, level.operator);
    n.answers = pickRandomWithAnswer(
      level.numberAnswers,
      level.answer.min,
      level.answer.max,
      n.correctAnswer
    );
    n.correctIndex = n.answers.findIndex(item => item === n.correctAnswer);
    n.answerClicked = n.answers.map(() => false);
    n.qStart = Date.now();
    n.point = 0;
    return n;
  });
};

export const gameReset = () => {
  clearTimeout(clickTimer);
  store.update(old => {
    const n = { ...old, ...resetableStore };
    return n;
  });
};

export const handleStart = () => {
  clearTimeout(clickTimer);
  store.update(old => {
    const n = { ...old, ...resetableStore, status: "PLAYING" };
    return n;
  });
  generateQuestion();
  timeStart();
};
export const handleNextQuestion = () => {
  store.update(old => {
    const n = { ...old };
    return n;
  });
};
export const handleCompleted = () => {
  store.update(old => {
    const n = { ...old };
    n.status = "COMPLETED";
    return n;
  });
};
let clickTimer = null;
export const handleControlAfterClick = index => {
  clearTimeout(clickTimer);
  clickTimer = setTimeout(() => {
    let isCorrect = false;
    store.update(old => {
      const n = { ...old };
      n.canClick = true;
      n.answerClicked[index] = false;
      if (index === n.correctIndex) isCorrect = true;
      return n;
    });
    timeResume();
    if (isCorrect) generateQuestion();
  }, 500);
};

export const handleClick = index => {
  const s = get(store);
  if (!s.canClick) return;
  store.update(old => {
    const n = { ...old };
    n.canClick = false;
    n.answerClicked[index] = true;
    return n;
  });
  s.correctIndex === index ? handleCorrect(index) : handleWrong(index);
  timePause();
  handleControlAfterClick(index);
};

const handleCorrect = index => {
  speak("correct");
  timeAdd(2000);
  store.update(o => {
    const n = { ...o };
    const answerTime = Date.now() - n.qStart;
    const tempPoint =
      answerTime < 1000
        ? 200
        : answerTime > 3000
        ? 100
        : 200 - (answerTime - 1000) / 20;
    n.point = (tempPoint * (11 + n.currentStage)) / 10;
    n.score += n.point;
    if (answerTime < 1000) n.exp++;
    if (n.exp > 1) {
      if (n.currentStage < n.levelCap) n.currentStage++;
      n.exp = 0;
    }
    return n;
  });
};
const handleWrong = index => {
  speak("wrong");
  timeAdd(-4000);
  store.update(o => {
    const n = { ...o };
    n.exp = 0;
    return n;
  });
};
