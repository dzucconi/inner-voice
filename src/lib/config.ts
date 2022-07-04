import { params } from "queryparams";

export const CONFIG = params<{
  id: string;
  type: OscillatorType;
  speed: number;
}>({
  id: "homophones",
  type: "sine",
  speed: 1,
});
