export const previousItemExists = (index: number) => {
  return index > 0;
};

export const nextItemExists = (index: number, length: number) => {
  return index < length - 1;
};
