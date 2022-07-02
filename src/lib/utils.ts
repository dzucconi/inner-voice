import deburr from "lodash.deburr";

export const wait = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const strip = (input: string): string => {
  return deburr(input).replace(/[!"#$%&‘’“”'()*+,-./:;<=>?@[\]^_`{|}~]/g, "");
};
