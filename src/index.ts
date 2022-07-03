import RiTa from "rita";
import { tone } from "./lib/tone";
import { Phone, Phonemes } from "./lib/phonemes";
import { Note } from "./lib/notes";
import { strip, wait } from "./lib/utils";
import { get } from "./lib/get";
import { CONFIG } from "./lib/config";

const DOM = {
  root: document.getElementById("Root")!,
};

const STATE: {
  cursor: number;
  words: Word[];
} = {
  cursor: -1,
  words: [],
};

type Word = {
  token: string;
  phones: Phone[];
};

const init = async () => {
  DOM.root.innerHTML = `
    <button id="Loading" class="Play" disabled="true">Loading</button>
  `;

  const {
    entity: { body },
  } = await get(CONFIG.id);

  const tokens = body.split(" ").filter((token: string) => token !== "\n");

  STATE.words = tokens.map((token: string) => {
    return {
      token,
      phones: (RiTa.phones(strip(token)) as string).split("-") as Phone[],
    };
  });

  DOM.root.innerHTML = `
    <button id="Play" class="Play">Play</button>
  `;

  document.getElementById("Play")!.addEventListener("click", step);
};

const step = async () => {
  if (STATE.cursor >= STATE.words.length - 1) {
    STATE.cursor = 0;

    await wait(1000);
  } else {
    STATE.cursor = STATE.cursor + 1;
  }

  const word = STATE.words[STATE.cursor];

  const notes = word.phones.map((phone) => {
    const latin = Phonemes.fromLatin(phone);
    const octave = Phonemes.octave(phone);

    const note = `${latin}${octave}`;
    const frequency = Note.fromLatin(note).frequency();

    return [frequency, Phonemes.duration(phone)];
  });

  DOM.root.innerHTML = `
    <div id="Word" class="Word">${word.token}</div>
  `;

  await notes.reduce(async (promise, [frequency, duration]) => {
    await promise;

    await tone({ frequency, type: CONFIG.type, duration });
  }, Promise.resolve());

  document.getElementById("Word")!.classList.add("Word--active");

  await wait(150);

  step();
};

init();
