import PropTypes from 'prop-types';

function SubmitButton({ textContent }) {
   return (
      <div>
         <button>{textContent}</button>
      </div>
   )
}

SubmitButton.propTypes = {
   textContent: PropTypes.string,
}

export default SubmitButton;