import { tone } from "./lib/tone";
import { wait } from "./lib/utils";
import { get } from "./lib/get";
import { CONFIG } from "./lib/config";
import { build, process, Word } from "./lib/words";
import { Phonemes } from "./lib/phonemes";

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

const init = async () => {
  DOM.root.innerHTML = `
    <button id="Loading" class="Play" disabled="true">Loading</button>
  `;

  try {
    const {
      entity: { body },
    } = await get(CONFIG.id);

    STATE.words = build(body);

    DOM.root.innerHTML = `
      <button id="Play" class="Play">Play</button>
    `;

    document.getElementById("Play")!.addEventListener("click", step);
  } catch (err) {
    console.error(err);

    DOM.root.innerHTML = `
      <div class="Error">Error</div>
    `;
  }
};

const step = async () => {
  if (STATE.cursor >= STATE.words.length - 1) {
    STATE.cursor = 0;
    await wait(1000);
  } else {
    STATE.cursor = STATE.cursor + 1;
  }

  const word = STATE.words[STATE.cursor];

  const notes = process(word);

  DOM.root.innerHTML = `
    <div id="Word" class="Word">${word.token}</div>
  `;

  if (CONFIG.mode === "chords") {
    const duration = notes.reduce((total, note) => total + note.duration, 0);

    await Promise.all(
      notes.map(({ frequency }) => {
        return tone({ frequency, type: CONFIG.type, duration });
      })
    );
  }

  if (CONFIG.mode === "notes") {
    await notes.reduce(async (promise, { frequency, duration }) => {
      await promise;
      await tone({ frequency, type: CONFIG.type, duration });
    }, Promise.resolve());
  }

  document.getElementById("Word")!.classList.add("Word--active");

  await wait(Phonemes.pause());

  step();
};

init();
