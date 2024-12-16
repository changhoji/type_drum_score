interface MetronomeData {
  barStart: number;
  bpm: number;
  currentBeat: number;
  isActive: boolean;
  timeSignature: {
    beatPerBar: number;
    note: number;
  };
}
