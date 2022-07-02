const BASE_FREQ = 440; // A4 'main' note
const BASE_OFFSET = [4, 1]; // offset of base note from D0

// Two dimensional [octave, fifth] - relative to the 'main' note
const NOTES = {
  Fbb: [10, -17],
  Cbb: [10, -16],
  Gbb: [9, -15],
  Dbb: [8, -14],
  Abb: [8, -13],
  Ebb: [7, -12],
  Bbb: [7, -11],

  Fb: [6, -10],
  Cb: [5, -9],
  Gb: [5, -8],
  Db: [4, -7],
  Ab: [4, -6],
  Eb: [3, -5],
  Bb: [3, -4],

  F: [2, -3],
  C: [1, -2],
  G: [1, -1],
  D: [0, 0],
  A: [0, 1],
  E: [-1, 2],
  B: [-1, 3],

  "F#": [-2, 4],
  "C#": [-3, 5],
  "G#": [-3, 6],
  "D#": [-4, 7],
  "A#": [-4, 8],
  "E#": [-5, 9],
  "B#": [-5, 10],

  Fx: [-6, 11],
  Cx: [-7, 12],
  Gx: [-7, 13],
  Dx: [-8, 14],
  Ax: [-8, 15],
  Ex: [-9, 16],
  Bx: [-10, 17],
};

type Coord = [number, number];

export class Note {
  coord: Coord;

  constructor(coord: [number, number]) {
    this.coord = coord;
  }

  static fromLatin(name: string) {
    const [note, _octave] = name.split(/(\d+)/);
    const octave = parseInt(_octave, 10);

    const reconciled = NOTES[note as keyof typeof NOTES];

    if (!reconciled) {
      throw new Error(`Invalid note name: ${name}`);
    }

    const coordinate: Coord = [reconciled[0] + octave, reconciled[1]];

    coordinate[0] -= BASE_OFFSET[0];
    coordinate[1] -= BASE_OFFSET[1];

    return new Note(coordinate);
  }

  frequency() {
    return (
      BASE_FREQ *
      2.0 ** ((this.coord[0] * 1200 + this.coord[1] * 700.0) / 1200.0)
    );
  }
}
