import PropTypes from 'prop-types';

function SubmitButton({ onSubmit }) {
   return (
      <button onClick={onSubmit}>Start Suggestions</button>
   )
}

SubmitButton.propTypes = {
   textContent: PropTypes.string,
}

export default SubmitButton;