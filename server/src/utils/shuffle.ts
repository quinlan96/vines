const shuffle = <T>(a: Array<T>) => {
  const b: Array<T> = a;
  let i: number;
  let j: number;
  let x: T;

  for (i = b.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    x = b[i];
    b[i] = b[j];
    b[j] = x;
  }

  return b;
};

export default shuffle;
