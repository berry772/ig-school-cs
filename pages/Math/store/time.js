import { writable } from "svelte/store";
import { handleCompleted } from "./store";

//constants
const totalTime = 30000;
//
export const time = writable(0);
let interval = null;

export const timeStart = () => {
  if (interval) clearInterval(interval);
  time.set(totalTime);
  interval = setInterval(() => {
    time.update(old => {
      if (old < 0) {
        clearInterval(interval);
        handleCompleted();
      }
      return old - 150;
    });
  }, 50);
};

export const timeAdd = t => {
  time.update(old => {
    return old + t > totalTime ? totalTime : old + t;
  });
};

export const timePause = () => {
  if (interval) clearInterval(interval);
};
export const timeResume = () => {
  interval = setInterval(() => {
    time.update(old => {
      if (old < 0) {
        clearInterval(interval);
        handleCompleted();
      }
      return old - 200;
    });
  }, 50);
};
