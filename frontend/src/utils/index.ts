export const previousItemExists = (index: number) => {
  return index > 0;
};

export const nextItemExists = (index: number, length: number) => {
  return index < length - 1;
};

const weekdayFormatter = new Intl.DateTimeFormat('pl-PL', {
  weekday: 'long',
});

export const getPolishWeekday = (date: string) => {
  return weekdayFormatter.format(new Date(date));
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}