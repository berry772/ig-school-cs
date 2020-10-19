import { patt } from "./data";

export const randomPick = (array, n) => {
  const a = [...array];
  let k = array.length;
  while (k > array.length - n) {
    const i = Math.floor(Math.random() * k--);
    let t = a[i];
    a[i] = a[k];
    a[k] = t;
  }
  return a.slice(-n);
};

export const randomColor = () => {
  let r = Math.floor(Math.random() * 260);
  r = r > 60 ? r + 100 : r;
  const rp = Math.floor(Math.random() * patt.length);
  return {
    a: `hsl(${r},77%,66%)`,
    b: `hsl(${r},77%,77%)`,
    c: `hsl(${r},77%,88%)`,
    p: 'url("' + patt[rp](`hsl(${r},77%,66%)`) + '")'
  };
};

export const calcScore = (totalCards, moves, time) => {
  if (totalCards === 16) {
    const m1 = moves > 40 ? 40 : moves;
    const m2 = ((40 - m1) / 35) * 90 + 10;
    const t1 = time > 120 ? 120 : time;
    const t2 = ((120 - t1) / 110) * 90 + 10;
    return m2 * t2;
  } else {
    const m1 = moves > 60 ? 60 : moves;
    const m2 = ((60 - m1) / 50) * 90 + 10;
    const t1 = time > 180 ? 180 : time;
    const t2 = ((180 - t1) / 160) * 90 + 10;
    return m2 * t2;
  }
};

export const formatScore = score => {
  return ("" + Math.round(score)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const dynamicSort = property => {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function(a, b) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};

export const getMonth = date => {
  return (
    date.getFullYear() +
    date.getMonth().toLocaleString(undefined, { minimumIntegerDigits: 2 })
  );
};
