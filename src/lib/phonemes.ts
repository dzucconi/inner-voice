import { CONFIG } from "./config";
import { range } from "./utils";

export const NOTES = ["F", "C", "G", "D", "A", "E", "B"] as const;
export const OCTAVE_OFFSET = 2;
export const SPEED = CONFIG.speed;

export const PHONEMES = {
  aa: [106, 128],
  ae: [133, 187],
  ah: [65, 85],
  ao: [65, 85],
  aw: [106, 160],
  ax: [65, 85],
  ay: [106, 160],
  b: [32, 43],
  ch: [65, 85],
  d: [32, 43],
  dh: [65, 85],
  eh: [65, 85],
  er: [65, 96],
  ey: [106, 160],
  f: [32, 43],
  g: [32, 43],
  hh: [65, 85],
  ih: [65, 85],
  iy: [106, 160],
  jh: [65, 85],
  k: [32, 43],
  l: [85, 96],
  m: [85, 96],
  n: [85, 96],
  ng: [85, 96],
  ow: [106, 160],
  oy: [106, 160],
  p: [32, 43],
  r: [32, 43],
  s: [85, 96],
  sh: [85, 96],
  t: [32, 43],
  th: [85, 96],
  uh: [106, 160],
  uw: [106, 160],
  v: [85, 96],
  w: [85, 96],
  wh: [85, 96],
  y: [85, 96],
  yu: [85, 96],
  z: [85, 96],
  zh: [85, 96],
} as const;

const PAUSE = [130, 170] as const;

export type Phone = keyof typeof PHONEMES;

export class Phonemes {
  static collection = PHONEMES;
  static octaveOffset = OCTAVE_OFFSET;
  static notes = NOTES;
  static speed = SPEED;

  static get(phoneme: keyof typeof PHONEMES) {
    return this.collection[phoneme];
  }

  static octaves() {
    return this.size() / this.notes.length;
  }

  static size() {
    return this.keys().length;
  }

  static keys() {
    return Object.keys(this.collection);
  }

  static indexOf(phone: Phone) {
    return this.keys().indexOf(phone);
  }

  static fromLatin(phone: Phone) {
    return this.notes[this.indexOf(phone) % this.notes.length];
  }

  static octave(phone: Phone) {
    return (
      Math.ceil((this.indexOf(phone) + 1) / (this.size() / this.octaves())) +
      this.octaveOffset
    );
  }

  static duration(phone: Phone) {
    const [min, max] = this.get(phone);
    return range(min, max) * this.speed;
  }

  static pause() {
    return range(...PAUSE);
  }

  static map<T>(fn: (key: Phone, min: number, max: number) => T) {
    return this.keys().map((key: Phone) => {
      const [min, max] = this.get(key);
      return fn(key, min, max);
    });
  }
}
