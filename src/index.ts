import RiTa from "rita";
import { tone } from "./lib/tone";
import { Phone, Phonemes } from "./lib/phonemes";
import { Note } from "./lib/notes";

const DOM = {
  root: document.getElementById("Root")!,
};

const STATE = {
  cursor: -1,
};

const TEXT = `ad add aerie airy ail ale air heir aisle isle all awl allowed aloud altar alter arc ark ascent assent ate eight attendance attendants aural oral axes axis aye eye bail bale baited bated bald bawled ball bawl band banned bard barred bare bear baron barren base bass based baste be bee beach beech beat beet beau bow beer bier bell belle berry bury berth birth billed build blew blue bloc block boar bore board bored boarder border bold bowled bolder boulder bootie booty born borne burro burrow bough bow braid brayed brake break bread bred brewed brood brews bruise bridal bridle broach brooch brows browse but butt buy bye caddie caddy callous callus canon cannon canter cantor canvas canvass capital capitol carat carrot carol carrel cast caste cede seed ceiling sealing cell sell cellar seller censor sensor cent scent cereal serial cession session chance chants chased chaste cheap cheep chews choose chic sheik chilli chilly choir quire choral coral chord cored chute shoot cite sight clause claws close clothes coarse course colonel kernel complement compliment council counsel coward cowered creak creek crewel cruel crews cruise cue queue currant current cygnet signet cymbal symbol dam damn days daze dear deer dense dents desert dessert dew due die dye disburse disperse discreet discrete doe dough does doze done dun dual duel dyeing dying earn urn eave eve eek eke eight ate ewe you ewes yews eye aye eyelet islet faint feint fair fare faun fawn faze phase feat feet fined find fir fur fisher fissure flair flare flea flee flew flue floe flow flour flower foaled fold for four foreword forward forth fourth foul fowl franc frank frays phrase freeze frieze friar fryer gaff gaffe gait gate gamble gambol genes jeans gibe jibe gild guild gilt guilt knew new gofer gopher gorilla guerrilla gourd gored grate great grill grille grisly grizzly groan grown guessed guest guise guys hail hale hair hare hall haul hangar hanger hart heart hay hey heal heel hear here heard herd heir air heroin heroine hew hue hi high him hymn ho hoe hoard horde hoarse horse hoes hose hole whole holy wholly hostel hostile hour our idle idol in inn incidence incidents intense intents isle aisle islet eyelet jam jamb jeans genes jibe gibe kernel colonel knave nave knead need knew new knight night knit nit knot not know no knows nose lacks lax lain lane lama llama laps lapse lay lei leach leech lead led leak leek lean lien leased least lessen lesson levee levy lie lye links lynx lo low load lode loan lone locks lox loot lute made maid mail male main mane maize maze mall maul manner manor mantel mantle marshal martial mask masque massed mast meat meet medal meddle metal mettle mewl mule mews muse might mite mince mints mind mined miner minor missal missile missed mist moan mown moose mousse morning mourning muscle mussel mustard mustered naval navel nave knave nay neigh need knead new gnu nicks nix night knight nit knit no know none nun nose knows not knot oar ore ode owed oh owe one won oral aural our hour paced paste packed pact pail pale pain pane pair pear palette pallet passed past patience patients pause paws peace piece peak peek peal peel pearl purl pedal peddle peer pier phase faze phrase frays plain plane plait plate pleas please plum plumb pole poll pore pour praise prays presence presents pride pried pries prize primer primmer prince prints principal principle profit prophet quarts quartz queue cue quire choir rabbet rabbit rain reign raise rays rap wrap rapt wrapped real reel red read read reed reek wreak residence residents rest wrest retch wretch review revue right write ring wring road rowed roe row role roll roomer rumour root route rose rows rote wrote rouse rows rude rued rung wrung rye wry sac sack sail sale sane seine saver savour scene seen scent sent scull skull sea see sealing ceiling seam seem seas seize seed cede sell cell seller cellar sensor censor serf surf serge surge serial cereal session cession sew sow shearn sheer sheik chic shoe shoo shone shown shoot chute sic sick side sighed sighs size sight cite signet cygnet slay sleigh sleight slight soar sore soared sword sole soul soled sold some sum son sun staid stayed stairs stares stake steak stationary stationery steal steel step steppe stile style straight strait succour sucker suite sweet symbol cymbal tacked tact tacks tax tail tale taper tapir taught taut tea tee team teem tear tier teas tease tense tents tern turn their there threw through throes throws throne thrown thyme time tic tick tide tied too two toad towed toe tow told tolled tracked tract troop troupe trussed trust undo undue urn earn use yews vain vein vale veil vice vise wade weighed waist waste wait weight waive wave wares wears warn worn way weigh we wee weak week whole hole wholly holy won one wood would wrap rap wrapped rapped wreak reek wrest rest wretch retch wring ring write right wrote rote wrung rung wry rye yew you yews use yoke yolk`;

const tokens = RiTa.tokenize(
  TEXT.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, "")
).filter((token) => token !== "\n");

type Word = {
  token: string;
  phones: Phone[];
};

const words: Word[] = tokens.map((token: string) => {
  return { token, phones: (RiTa.phones(token) as string).split("-") };
});

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const step = async () => {
  STATE.cursor = STATE.cursor + 1;

  const word = words[STATE.cursor % words.length];

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

    await tone({ frequency, type: "sine", duration });
  }, Promise.resolve());

  document.getElementById("Word")?.classList.add("Word--active");

  await wait(300);

  step();
};

DOM.root.innerHTML = `
  <button class="Play">Play</button>
`;

DOM.root.getElementsByTagName("button")[0].addEventListener("click", () => {
  step();
});
