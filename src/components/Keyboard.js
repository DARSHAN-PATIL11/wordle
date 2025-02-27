import React, { useCallback, useEffect, useContext } from "react";
import Key from "./Key";
import { AppContext } from "../App";

function Keyboard() {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const {
    disabledLetters,
    currAttempt,
    gameOver,
    onSelectLetter,
    onEnter,
    onDelete,
  } = useContext(AppContext); // Removed "board" (unused)

  const handleKeyboard = useCallback(
    (event) => {
      if (gameOver.gameOver) return;
      if (event.key === "Enter") {
        onEnter();
      } else if (event.key === "Backspace") {
        onDelete();
      } else {
        [...keys1, ...keys2, ...keys3].forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
      }
    },
    [gameOver, keys1, keys2, keys3, onDelete, onEnter, onSelectLetter] // ✅ Correct dependencies
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard">
      <div className="line1">
        {keys1.map((key) => (
          <Key key={key} keyVal={key} disabled={disabledLetters.includes(key)} />
        ))}
      </div>
      <div className="line2">
        {keys2.map((key) => (
          <Key key={key} keyVal={key} disabled={disabledLetters.includes(key)} />
        ))}
      </div>
      <div className="line3">
        <Key key="ENTER" keyVal="ENTER" bigKey />
        {keys3.map((key) => (
          <Key key={key} keyVal={key} disabled={disabledLetters.includes(key)} />
        ))}
        <Key key="DELETE" keyVal="DELETE" bigKey />
      </div>
    </div>
  );
}

export default Keyboard;
