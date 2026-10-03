const months = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avgust",
  "sentabr",
  "oktabr",
  "noyabr",
  "dekabr",
];

// Explicit month names also work in browsers with incomplete Uzbek ICU data.
export function formatDate(date) {
  return `${date.getDate()}-${months[date.getMonth()]}, ${date.getFullYear()}`;
}

export function formatMonth(date) {
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}
