import { useState } from 'react';
import Header from './components/Header';
import KeyForm from './components/KeyForm';

function App() {
  const [chords, setChords] = useState();

  return (
    <div className="App">
      <Header />
      <KeyForm />
    </div>
  );
}

export default App;
