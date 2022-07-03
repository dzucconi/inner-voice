import { params } from "queryparams";

export const CONFIG = params<{ id: string; type: OscillatorType }>({
  id: "homophones",
  type: "sine",
});
