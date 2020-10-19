import { writable } from "svelte/store";
export const store = writable({
  status: 0,
  board: [...new Array(20).fill("")],
  a: null,
  b: null
});
export const resetBoard = () => {
  store.update(o => ({ ...o, board: [...new Array(20).fill("")] }));
};
