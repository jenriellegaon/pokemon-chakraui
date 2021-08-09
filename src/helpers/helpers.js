/* eslint-disable no-bitwise */
export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export const capitalizeFirstLetter = (string) => {
  return string[0].toUpperCase() + string.slice(1)
}
