export const NOTES = ["F", "C", "G", "D", "A", "E", "B"] as const;

export const OCTAVE_OFFSET = 2;

export const PHONEMES = {
  aa: { duration: 217 },
  ae: { duration: 286 },
  ah: { duration: 328 },
  ao: { duration: 463 },
  aw: { duration: 456 },
  ax: { duration: 456 },
  ay: { duration: 300 },
  b: { duration: 75 },
  ch: { duration: 126 },
  d: { duration: 75 },
  dh: { duration: 168 },
  eh: { duration: 193 },
  er: { duration: 420 },
  ey: { duration: 288 },
  f: { duration: 93 },
  g: { duration: 93 },
  hh: { duration: 171 },
  ih: { duration: 286 },
  iy: { duration: 158 },
  jh: { duration: 138 },
  k: { duration: 93 },
  l: { duration: 328 },
  m: { duration: 185 },
  n: { duration: 316 },
  ng: { duration: 207 },
  ow: { duration: 417 },
  oy: { duration: 578 },
  p: { duration: 94 },
  r: { duration: 132 },
  s: { duration: 298 },
  sh: { duration: 308 },
  t: { duration: 76 },
  th: { duration: 256 },
  uh: { duration: 315 },
  uw: { duration: 434 },
  v: { duration: 287 },
  w: { duration: 330 },
  wh: { duration: 352 },
  y: { duration: 300 },
  yu: { duration: 208 },
  z: { duration: 320 },
  zh: { duration: 192 },
} as const;

export type Phone = keyof typeof PHONEMES;

export class Phonemes {
  static collection = PHONEMES;
  static octaveOffset = OCTAVE_OFFSET;

  static get(phoneme: keyof typeof PHONEMES) {
    return this.collection[phoneme] || {};
  }

  static notes() {
    return NOTES;
  }

  static octaves() {
    return this.size() / this.notes().length;
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
    return this.notes()[this.indexOf(phone) % this.notes().length];
  }

  static octave(phone: Phone) {
    return (
      Math.ceil((this.indexOf(phone) + 1) / (this.size() / this.octaves())) +
      this.octaveOffset
    );
  }

  static duration(phone: Phone) {
    return this.get(phone).duration / 3;
  }
}
