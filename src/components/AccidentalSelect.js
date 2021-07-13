function AccidentalSelect({ onChange, value }) {
  return (
    <div className="quality-select">
      <label htmlFor="accidentalSelect">Accidental</label>
      <select
        id="accidentalSelect"
        value={value}
        name="accidental-select"
        onChange={onChange}
      >
        <option value="natural">&#9838;</option>
        <option value="sharp">&#9839;</option>
        <option value="flat">&#9837;</option>
      </select>
    </div>
  );
}

export default AccidentalSelect;
