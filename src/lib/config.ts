import { params } from "queryparams";

export const CONFIG = params<{
  id: string;
  type: OscillatorType;
  speed: number;
  pause: [number, number];
  mode: "notes" | "chords";
}>({
  id: "homophones",
  type: "sine",
  speed: 1,
  pause: [130, 170],
  mode: "notes",
});
