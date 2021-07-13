function TonicInput({ onChange, value }) {
  return (
    <>
      <h3 htmlFor="chordInput">What key is our music in?</h3>
      <input
        id="chordInput"
        type="text"
        placeholder="Tonic"
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default TonicInput;
