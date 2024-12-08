import useSound from "use-sound";
import metronome from "../metronome.mp3";
import { useEffect, useRef, useState } from "react";
import { start } from "repl";
import { useRecoilState } from "recoil";
import { bpmState } from "../App";

export default function Metronome() {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [bpm, setBpm] = useRecoilState(bpmState);
  const bpmRef = useRef<number>(bpm);

  const [sync, setSync] = useState<number>(0);
  const syncRef = useRef<number>(sync);

  const [play, { stop }] = useSound(metronome);

  useEffect(() => {
    bpmRef.current = bpm;
    syncRef.current = sync;
  }, [bpm, sync]);

  const startMetronme = () => {
    if (timerRef.current) return;

    const interval = 60000 / bpmRef.current;
    let expectedTime = Date.now();

    const timerFunction = () => {
      console.log("1");
      play();
      const diff = Date.now() - expectedTime;

      if (syncRef.current != 0) {
        console.log(2);
        expectedTime += syncRef.current;
        setSync(0);
      }
      expectedTime += 60000 / bpmRef.current;
      timerRef.current = setTimeout(
        timerFunction,
        Math.max(0, interval - diff)
      );
    };

    timerRef.current = setTimeout(timerFunction);
  };

  const stopMetronome = () => {
    if (!timerRef.current) return;
    clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  return (
    <div className="flex flex-col">
      <input
        value={bpm}
        onChange={(e) => setBpm(Number(e.target.value))}
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
