export const context = new AudioContext();

interface Tone {
  /** Specified in milliseconds */
  duration: number;
  frequency: number;
  type: OscillatorType;
}

export const tone = ({
  duration = 100,
  frequency = 440,
  type = "sine",
}: Tone) => {
  return new Promise((resolve) => {
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.connect(gain);

    gain.gain.value = 0.5;

    osc.type = type;
    osc.frequency.value = frequency;

    gain.connect(context.destination);

    osc.start(0);
    osc.stop(context.currentTime + duration / 1000);

    osc.addEventListener("ended", resolve);
  });
};
