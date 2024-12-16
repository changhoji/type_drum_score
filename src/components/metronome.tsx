import useSound from "use-sound";
import metronomeSound from "../metronome.mp3";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { metronomeState, noteState } from "../App";

export default function Metronome() {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [metronome, setMetronome] = useRecoilState(metronomeState);
  const metronomeRef = useRef<MetronomeData>(metronome);

  const [sync, setSync] = useState<number>(0);
  const syncRef = useRef<number>(sync);

  const [_, setNote] = useRecoilState(noteState);

  const [play] = useSound(metronomeSound);

  useEffect(() => {
    metronomeRef.current = metronome;
    syncRef.current = sync;
  }, [metronome, sync]);

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    setMetronome((prev) => ({ ...prev, bpm: value }));
  };

  const startMetronme = () => {
    if (timerRef.current) return;

    let bpm = metronome.bpm;
    const interval = 60000 / metronomeRef.current.bpm;
    let expectedTime = Date.now();
    let beatCnt = 0;

    const timerFunction = () => {
      console.log("play");
      play();
      const diff = Date.now() - expectedTime;
      if (bpm !== metronomeRef.current.bpm) {
        bpm = metronomeRef.current.bpm;
        setMetronome((prev) => ({ ...prev, barStart: Date.now() }));
        beatCnt = 0;
        setNote([false, false, false, false]);
      }

      if (syncRef.current != 0) {
        expectedTime += syncRef.current;
        setSync(0);
      }

      if (beatCnt === metronomeRef.current.timeSignature.beatPerBar) {
        setMetronome((prev) => ({ ...prev, barStart: Date.now() }));
        beatCnt = 0;
        setNote([false, false, false, false]);
      }
      beatCnt += 1;
      expectedTime += 60000 / metronomeRef.current.bpm;

      timerRef.current = setTimeout(
        timerFunction,
        Math.max(0, interval - diff)
      );
    };

    setMetronome((prev) => ({
      ...prev,
      barStart: Date.now(),
      bpm: metronome.bpm,
      currentBeat: 0,
      isActive: true,
    }));
    setNote([false, false, false, false]);
    play();
    timerRef.current = setTimeout(timerFunction);
  };

  const stopMetronome = () => {
    if (!timerRef.current) return;
    clearTimeout(timerRef.current);
    timerRef.current = null;

    setMetronome((prev) => ({ ...prev, isActive: false }));
  };

  return (
    <div className="flex flex-col">
      <input
        value={metronome.bpm}
        onChange={handleBpmChange}
        type="number"
        className="border border-black"
      />
      <div>
        <button
          onClick={startMetronme}
          className="border border-black rounded-md"
        >
          play
        </button>
        <button
          onClick={stopMetronome}
          className="border border-black rounded-md"
        >
          stop
        </button>
        <button
          onClick={() => setSync(-50)}
          className="border border-black rounded-md"
        >
          {"<"}
        </button>
        <button
          onClick={() => setSync(50)}
          className="border border-black rounded-md"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
