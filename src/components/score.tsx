import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import { Factory, Formatter, Renderer, Stave, StaveNote, Voice } from "vexflow";
import { noteState } from "../App";

export default function Score() {
  const note = useRecoilValue(noteState);

  useEffect(() => {
    const canvasElement = document.getElementById("canvas") as HTMLDivElement;
    if (canvasElement) {
      canvasElement.innerHTML = "";
    }

    const renderer = new Renderer(canvasElement, Renderer.Backends.SVG);

    renderer.resize(500, 500);
    const context = renderer.getContext();

    const stave = new Stave(10, 40, 400);
    stave.addClef("percussion").addTimeSignature("4/4");

    // Create the notes
    const notes = [
      // A quarter-note C.
      new StaveNote({ keys: ["c/4"], duration: "q" }),

      // A quarter-note D.
      new StaveNote({ keys: ["d/4"], duration: "q" }),

      // A quarter-note rest. Note that the key (b/4) specifies the vertical
      // position of the rest.
      new StaveNote({ keys: ["b/4"], duration: "qr" }),

      // A C-Major chord.
      new StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "q" }),
    ];

    // Create a voice in 4/4 and add above notes
    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(notes);

    // Format and justify the notes to 400 pixels.
    new Formatter().joinVoices([voice]).format([voice], 350);

    // Render voice
    stave.setContext(context).draw();
    voice.draw(context, stave);
  }, [note]);

  return (
    <>
      <div id="canvas" />
    </>
  );
}
