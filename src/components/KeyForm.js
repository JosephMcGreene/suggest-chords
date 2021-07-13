import { useState } from "react";
import TonicInput from "./TonicInput";
import AccidentalSelect from "./AccidentalSelect";
import QualitySelect from "./QualitySelect";

function KeyForm({ setFullTonic }) {
  const [tonic, setTonic] = useState("");
  const [accidental, setAccidental] = useState("natural");
  const [quality, setQuality] = useState(true);

  function onFormChange(e) {
    e.preventDefault();

    setFullTonic({ tonic, accidental, quality });
  }

  return (
    <form onSubmit={onFormChange}>
      <TonicInput
        value={tonic}
        onChange={(e) => setTonic(e.currentTarget.value)}
      />
      <AccidentalSelect
        value={accidental}
        onChange={(e) => setAccidental(e.target.value)}
      />
      <QualitySelect value={quality} onChange={() => setQuality(!quality)} />
      <button>Start Suggestions</button>
      <p>{tonic}</p>
    </form>
  );
}

export default KeyForm;
