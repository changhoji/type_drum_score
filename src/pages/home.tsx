import Metronome from "../components/metronome";
import MusicInput from "../components/music_input";
import Score from "../components/score";
import TypeDrum from "../components/type_drum";

export default function Home() {
  return (
    <>
      <MusicInput />
      <Metronome />
      <TypeDrum />
    </>
  );
}
