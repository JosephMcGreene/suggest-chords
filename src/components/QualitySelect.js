function QualitySelect({ onChange, value }) {
  return (
    <div className="quality-select">
      <label htmlFor="qualitySelect">Quality</label>
      <select id="qualitySelect" name="type-select" onChange={onChange}>
        <option value={true}>Major</option>
        <option value={false}>minor</option>
      </select>
    </div>
  );
}

export default QualitySelect;
