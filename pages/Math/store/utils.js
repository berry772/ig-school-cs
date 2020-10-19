export const pickRandom = (howMany, arr) => {
  const array = [...arr];
  let k = array.length;
  while (k > array.length - howMany) {
    const i = Math.floor(Math.random() * k--);
    const t = array[i];
    array[i] = array[k];
    array[k] = t;
  }
  return array.slice(k);
};
export const pickRandomRange = (howMany, min, max) => {
  if (min > max) throw new Error("pickRandom error:check min and max");
  if (howMany > max - min + 1)
    throw new Error("pickRandom error:check howMany");
  if (isNaN(howMany) || isNaN(min) || isNaN(max)) throw new Error("not number");

  const baseArray = [...Array(max - min + 1)].reduce(
    (r, a, i) => r.concat(min + i),
    []
  );
  return pickRandom(howMany, baseArray);
};
export const pickRandomWithAnswer = (howMany, min, max, answer) => {
  if (min > max) throw new Error("pickRandom error:check min and max");
  if (howMany > max - min + 1)
    throw new Error("pickRandom error:check howMany");
  if (isNaN(howMany) || isNaN(min) || isNaN(max)) throw new Error("not number");
  if (answer < min || answer > max) throw new Error("answer is outbound");

  const baseArray = [...Array(max - min + 1)]
    .reduce((r, a, i) => (min + i === answer ? r : r.concat(min + i)), [])
    .concat(answer);
  let k = baseArray.length - 1;
  while (k > baseArray.length - howMany) {
    const i = Math.floor(Math.random() * k--);
    const t = baseArray[i];
    baseArray[i] = baseArray[k];
    baseArray[k] = t;
  }
  return pickRandom(howMany, baseArray.slice(k));
};
export const getAnswer = (questionsArray, operator) => {
  return questionsArray.reduce((result, item) => {
    if (operator === "PLUS") {
      return result + item;
    }
    return result;
  });
};
export const makeQuestionScreen = arr => {
  return arr.reduce((r, a, i) => {
    if (i + 1 < arr.length) {
      return r.concat([a, "+"]);
    } else {
      return r.concat([a, "=", "?"]);
    }
  }, []);
};

const voice = window.speechSynthesis || {
  cancel: () => {},
  speak: () => {}
};
let speakUtter = {};
try {
  speakUtter = new SpeechSynthesisUtterance();
  speakUtter.lang = "en-US";
  speakUtter.pitch = 1;
  speakUtter.rate = 1;
} catch {}

export const speak = t => {
  voice.cancel();
  speakUtter.text = t;
  voice.speak(speakUtter);
};

export const formatScore = score => {
  return ("" + Math.round(score)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
