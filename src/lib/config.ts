import { params } from "queryparams";

export const CONFIG = params<{
  id: string;
  type: OscillatorType;
  speed: number;
  pause: [number, number];
}>({
  id: "homophones",
  type: "sine",
  speed: 1,
  pause: [130, 170],
});
