import { Phonemes } from "./phonemes";
import { build, process } from "./words";

const sum = (xs: number[]) => {
  return xs.reduce((acc, x) => acc + x, 0);
};

describe("Phonemes", () => {
  // A task to tune the phoneme length
  it("approximates the correct length", () => {
    const words = build("The quick brown fox jumps over the lazy dog");
    // Time in milliseconds to read the sentence
    const target = 3560;

    const durations = words.map(process).map((phonemes) => {
      return phonemes.map(({ duration }) => duration);
    });

    const pauses = [...new Array(durations.length - 1)].map(Phonemes.pause);

    const total = sum(durations.map(sum)) + sum(pauses);

    const difference = total - target;
    const factor = target / total;

    console.log({ difference, factor });

    const tuned = Phonemes.map((key, min, max) => {
      return { [key]: [Math.round(min * factor), Math.round(max * factor)] };
    }).reduce((memo, phoneme) => {
      return { ...memo, ...phoneme };
    }, {});

    console.log(tuned);
  });
});
