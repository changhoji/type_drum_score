import { useRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";
import { metronomeState, noteState } from "../App";
import Score from "./score";

export default function TypeDrum() {
  const [beat, setBeat] = useState<number>(-1);
  const [note, setNote] = useRecoilState(noteState);
  const metronome = useRecoilValue(metronomeState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const now = Date.now();
    const diff = now - metronome.barStart;
    const interval = 60000 / metronome.bpm;

    // const number = Number((diff / interval).toFixed(1));
    let number = Math.round(diff / interval);
    if (number === 4) {
      number = 0;
    }

    setNote((prev) => {
      let temp = [...prev];
      temp[number] = true;
      console.log(temp);
      return temp;
    });

    setBeat(number);
  };

  return (
    <div>
      <input
        value=""
        onChange={handleChange}
        className="border border-slate-950"
      />
      <div>{beat}</div>
      <Score />
      <div>{note.toString()}</div>
    </div>
  );
}
