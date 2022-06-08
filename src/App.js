import "./App.css";
import { useState, useEffect } from "react";
import raw from "./static/wordlist.txt";

function App() {
  const [lettersNum, setLettersNum] = useState(
    localStorage.getItem("lettersNum") || 0
  );
  const [letters, setLetters] = useState(localStorage.getItem("letters") || "");
  const [bank, setBank] = useState(localStorage.getItem("bank") || "");

  useEffect(() => {
    localStorage.setItem("lettersNum", lettersNum);
  }, [lettersNum]);
  useEffect(() => {
    localStorage.setItem("letters", letters);
  }, [letters]);
  useEffect(() => {
    localStorage.setItem("bank", bank);
  }, [bank]);

  const searchWord = () => {
    let reg = new RegExp(
      "\\b" +
        letters.replace(
          /_/g,
          `[${bank}]`
        ) +
        "\\b",

      "g"
    );
    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        if (text.match(reg)) {
          console.log(text.match(reg));
        }
      });
  };
  return (
    <div className="App">
      <label htmlFor="letterNumInput">Input number of letters word has</label>
      <input
        name="letterNumInput"
        onChange={(e) => setLettersNum(e.target.value)}
        type="number"
        min="0"
        value={lettersNum}
      ></input>
      <label htmlFor="letterInput">
        Input letters of word. Underscore for missing letter
      </label>
      <input
        maxLength={lettersNum || 0}
        name="letterInput"
        onChange={(e) => setLetters(e.target.value)}
        value={letters}
      ></input>
      <label htmlFor="bank">Input letters given.</label>
      <input
        name="bank"
        onChange={(e) => setBank(e.target.value)}
        value={bank}
      ></input>
      <button onClick={searchWord}>Search</button>
    </div>
  );
}

export default App;
