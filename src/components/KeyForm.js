import SubmitButton from './SubmitButton';

function KeyForm() {
   return (
      <form action="index.html" method="post">
         <h3 htmlFor="chordInput">What key is our music in?</h3>
         <input id="chordInput" type="text" placeholder="Letter Name" />

         <div className="quality-select">
            <label htmlFor="accidentalSelect">Accidental</label>
            <select id="accidentalSelect" name="accidental-select">
               <option value="natural">&#9838;</option>
               <option value="sharp">&#9839;</option>
               <option value="flat">&#9837;</option>
            </select>
         </div>

         <div className="quality-select">
            <label htmlFor="qualitySelect">Quality</label>
            <select id="qualitySelect" name="type-select">
               <option value="Major">Major</option>
               <option value="minor">minor</option>
            </select>
         </div>

         <SubmitButton textContent='Start Suggestions' />
      </form>
   )
}

export default KeyForm;