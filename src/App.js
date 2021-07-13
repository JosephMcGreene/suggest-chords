import React, { useState, useEffect } from "react";
import Key from "./Key";
import Header from "./components/Header";
import KeyForm from "./components/KeyForm";
import Chords from "./components/Chords";

function App() {
  const [currentTonic, setCurrentTonic] = useState({
    tonic: "",
    accidental: "",
    quality: true, // true == "Major", false == "minor"
  });

  const sharpKeysMajor = [
    "Cnatural",
    "Gnatural",
    "Dnatural",
    "Anatural",
    "Enatural",
    "Bnatural",
    "Fsharp",
    "Csharp",
  ];
  const flatKeysMajor = [
    "Cnatural",
    "Fnatural",
    "Bflat",
    "Eflat",
    "Aflat",
    "Dflat",
    "Gflat",
  ];

  const sharpKeysMinor = [
    "Anatural",
    "Enatural",
    "Bnatural",
    "Fsharp",
    "Csharp",
    "Gsharp",
    "Dsharp",
    "Asharp",
  ];
  const flatKeysMinor = [
    "Anatural",
    "Dnatural",
    "Gnatural",
    "Cnatural",
    "Fnatural",
    "Bflat",
    "Eflat",
    "Aflat",
  ];

  let scaleNotes = ["C", "D", "E", "F", "G", "A", "B"];

  const orderOfSharps = [
    "F sharp",
    "C sharp",
    "G sharp",
    "D sharp",
    "A sharp",
    "E sharp",
    "B sharp",
  ];
  const orderOfFlats = [
    "B flat",
    "E flat",
    "A flat",
    "D flat",
    "G flat",
    "C flat",
    "F flat",
  ];

  let tonicNote = currentTonic.tonic.toUpperCase() + currentTonic.accidental;
  let tonicAccidentals; /** Will be an array containing the letter names of the accidentals in the user's key */
  let currentKey; /** Will be an object in the Key class whose properties are derived from scaleNotes[], after scaleNotes[] has been transformed by finishKey(), used to derive the suggestions the app will generate */

  /**
   * Updates the state to the key that the user inputs
   * @return  {object}    an object of the new state, represents the tonic note and quality of that note, either Major or minor.
   */
  function setFullTonic(tonicElements) {
    setCurrentTonic(tonicElements);
  }

  /**
   * Uses tonicAccidentals[] made in establishKey() to finish constructing an array containing the notes necessary to return a key in establishKey();
   * @return  [Array]    an array containing the new key, used in establishKey() to instantiate a Key class object to suggest chords from.
   */
  function finishKey() {
    // This loop rearranges the notes in the scale to make tonic index 0 in scaleNotes[];
    while (currentTonic.tonic.toUpperCase() !== scaleNotes[0]) {
      let shiftNote = scaleNotes.shift();
      scaleNotes.push(shiftNote);
    }
    // This loop finds the appropriate note(s) to replace in scaleNotes[] from their corresponding note(s) in tonicAccidentals[] and gives them the appropriate accidental; ie, if the key will ultimately be D major, this loop finds "F" in scaleNotes[] and turns it into "F sharp", and finds "C" in scaleNotes[] and turns it into "C sharp", since those are the two sharps in D Major
    for (let i = 0; i < tonicAccidentals.length; i++) {
      scaleNotes.splice(
        scaleNotes.indexOf(tonicAccidentals[i].charAt(0)),
        1,
        tonicAccidentals[i]
      );
    }
    // The following loops add the appropriate quality to the name of the chords, whether it be in Major or minor;
    if (currentTonic.quality === true) {
      for (let i = 0; i < scaleNotes.length; i++) {
        if (i === 0 || i === 3 || i === 4) {
          scaleNotes.splice(i, 1, scaleNotes[i] + " Major");
        } else if (i === 1 || i === 2 || i === 5) {
          scaleNotes.splice(i, 1, scaleNotes[i] + " minor");
        } else if (i === 6) {
          scaleNotes.splice(i, 1, scaleNotes[i] + " diminished");
        }
      }
    } else if (currentTonic.quality === false) {
      for (let i = 0; i < scaleNotes.length; i++) {
        if (i === 2 || i === 4 || i === 5 || i === 6) {
          scaleNotes.splice(i, 1, scaleNotes[i] + " Major");
        } else if (i === 0 || i === 3) {
          scaleNotes.splice(i, 1, scaleNotes[i] + " minor");
        } else if (i === 1) {
          scaleNotes.splice(i, 1, scaleNotes[i] + " diminished");
        }
      }
    }

    return scaleNotes;
    // Trust me, I know the above loops are bulky and weird and hard to read, and I wish I were a better programmer, that I might refactor them to be more readable. However, due to the oddities of translating the language of music--a language rife with inconsistencies and parts that just don't *quite* line up the way they should--into the language of JavaScript, I know of no other way to differentiate between Major and minor keys, which is a vital, essential part of this app.
  }

  /**
   * A logic statement checking to make sure the user inputs a letter A through G. Used in error messages in establishKey()
   * @return  Boolean    whether the user's input is a music note or not.
   */
  function isAMusicNote() {
    if (
      currentTonic.tonic.toUpperCase() !== "A" &&
      currentTonic.tonic.toUpperCase() !== "B" &&
      currentTonic.tonic.toUpperCase() !== "C" &&
      currentTonic.tonic.toUpperCase() !== "D" &&
      currentTonic.tonic.toUpperCase() !== "E" &&
      currentTonic.tonic.toUpperCase() !== "F" &&
      currentTonic.tonic.toUpperCase() !== "G"
    ) {
      return true;
    }

    return false;
  }

  /**
   * Establishes the key used to render <Chords /> and individual <Chord /> components once the user presses the "Start Suggestions" button, or determines whether to tell user to input something else.
   * Uses finishKey()
   * @return  [Array]     an array containing the new key.
   */
  function establishKey() {
    if (isAMusicNote() === false) {
      return alert(
        "That letter is not a note used in music. Try entering a note A through G."
      );
    }
    // If the user input is a Major key with sharps:
    if (sharpKeysMajor.includes(tonicNote) && currentTonic.quality === true) {
      let numOfAccidentals = sharpKeysMajor.indexOf(tonicNote);
      // This filter makes tonicAccidentals[] a list, in order of Sharps/Flats, of the accidentals the tonic key contains;
      tonicAccidentals = orderOfSharps.filter(
        (i) => orderOfSharps.indexOf(i) < numOfAccidentals
      );
    }
    // If the user input is a Major key with flats:
    else if (
      flatKeysMajor.includes(tonicNote) &&
      currentTonic.quality === true
    ) {
      let numOfAccidentals = flatKeysMajor.indexOf(tonicNote);
      tonicAccidentals = orderOfFlats.filter(
        (i) => orderOfFlats.indexOf(i) < numOfAccidentals
      );
    }
    // If the user input is a minor key with sharps:
    else if (sharpKeysMinor.includes(tonicNote)) {
      let numOfAccidentals = sharpKeysMinor.indexOf(tonicNote);
      tonicAccidentals = orderOfSharps.filter(
        (i) => orderOfSharps.indexOf(i) < numOfAccidentals
      );
    }
    // If the user input is a minor key with flats:
    else if (flatKeysMinor.includes(tonicNote)) {
      let numOfAccidentals = flatKeysMinor.indexOf(tonicNote);
      tonicAccidentals = orderOfFlats.filter(
        (i) => orderOfFlats.indexOf(i) < numOfAccidentals
      );
    }

    finishKey();
    currentKey = new Key(
      scaleNotes[0],
      scaleNotes[1],
      scaleNotes[2],
      scaleNotes[3],
      scaleNotes[4],
      scaleNotes[5],
      scaleNotes[6]
    );

    scaleNotes = ["C", "D", "E", "F", "G", "A", "B"]; // scaleNotes is reset for the next time the user inputs new tonic and starts the process over again. We are using currentKey{} for the rest of the rendering, so we don't need scaleNotes[] anyway

    console.log(currentKey);
    return currentKey;
  }

  return (
    <div className="App">
      <Header />
      <KeyForm setFullTonic={setFullTonic} />

      <p>{tonicNote}</p>
    </div>
  );
}

export default App;
