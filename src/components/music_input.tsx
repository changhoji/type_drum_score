import { useRecoilState, useRecoilValue } from "recoil";
import { musicState } from "../App";
import { useRef } from "react";

export default function MusicInput() {
  const [music, setMusic] = useRecoilState(musicState);
  const musicRef = useRef<HTMLAudioElement>(null);

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
      </div>
    </div>
  );
}
