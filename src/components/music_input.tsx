import { useRecoilState, useRecoilValue } from "recoil";
import { metronomeState, musicState, musicTimeState } from "../App";
import { useEffect, useRef } from "react";

export default function MusicInput() {
  const [music, setMusic] = useRecoilState(musicState);
  const musicRef = useRef<HTMLAudioElement>(null);

  const [musicTime, setMusicTime] = useRecoilState(musicTimeState);

  const metronome = useRecoilValue(metronomeState);

  useEffect(() => {
    if (musicRef.current === null) return;
    setMusicTime(musicRef.current.currentTime);
  }, [metronome.barStart]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMusic(URL.createObjectURL(file));
    if (!music) return;
  };

  return (
    <div>
      <div>
        <label htmlFor="audio_input"></label>
        <input
          type="file"
          name="audio_input"
          accept=".mp3"
          onChange={handleChange}
        />
      </div>
      <div>
        <audio ref={musicRef} src={music} controls loop></audio>
        <button onClick={() => console.log(musicRef.current?.currentTime)}>
          audio time
        </button>
      </div>
    </div>
  );
}
