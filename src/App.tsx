import { atom, RecoilRoot } from "recoil";
import MusicInput from "./components/music_input";
import Home from "./pages/home";

export const musicState = atom<string>({
  key: "musicState",
  default: "",
});

export const bpmState = atom<number>({
  key: "bpmState",
  default: 100,
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
