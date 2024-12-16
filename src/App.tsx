import { atom, RecoilRoot } from "recoil";
import MusicInput from "./components/music_input";
import Home from "./pages/home";

export const musicState = atom<string>({
  key: "musicState",
  default: "",
});

export const metronomeState = atom<MetronomeData>({
  key: "metronomeState",
  default: {
    barStart: Date.now(),
    bpm: 100,
    currentBeat: 0,
    isActive: false,
    timeSignature: {
      beatPerBar: 4,
      note: 4,
    },
  },
});

export const noteState = atom<boolean[]>({
  key: "noteState",
  default: [false, false, false, false],
});

export const voiceState = atom<string[]>({
  key: "voiceState",
  default: [],
});

export const musicTimeState = atom<number>({
  key: "musicTimeState",
  default: 0,
});

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Home />
      </div>
    </RecoilRoot>
  );
}

export default App;
