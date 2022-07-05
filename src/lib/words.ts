import RiTa from "rita";
import { Note } from "./notes";
import { Phone, Phonemes } from "./phonemes";
import { strip } from "./utils";

export interface Word {
  token: string;
  phones: Phone[];
}

export const build = (input: string): Word[] => {
  const tokens = input.split(/(\s+)/).filter((token: string) => token !== "\n");

  return tokens.map((token: string) => ({
    token,
    phones: (RiTa.phones(strip(token)) as string).split("-") as Phone[],
  }));
};

export const process = (word: Word) => {
  return word.phones.map((phone) => {
    const latin = Phonemes.fromLatin(phone);
    const octave = Phonemes.octave(phone);

    const note = `${latin}${octave}`;
    const frequency = Note.fromLatin(note).frequency();

    return { frequency, duration: Phonemes.duration(phone) };
  });
};
