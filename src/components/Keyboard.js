import React, { useCallback, useEffect, useContext, useMemo } from "react";
import Key from "./Key";
import { AppContext } from "../App";

function Keyboard() {
  // ✅ Wrap arrays inside useMemo to prevent unnecessary recalculations
  const keys1 = useMemo(() => ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], []);
  const keys2 = useMemo(() => ["A", "S", "D", "F", "G", "H", "J", "K", "L"], []);
  const keys3 = useMemo(() => ["Z", "X", "C", "V", "B", "N", "M"], []);

  const { disabledLetters, gameOver, onSelectLetter, onEnter, onDelete } =
    useContext(AppContext); // ✅ Removed `currAttempt`

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
    [keys1, keys2, keys3, gameOver.gameOver, onEnter, onDelete, onSelectLetter]
  ); // ✅ Properly included dependencies

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => document.removeEventListener("keydown", handleKeyboard);
  }, [handleKeyboard]);

  return (
    <div className="keyboard">
      <div className="line1">
        {keys1.map((key) => (
          <Key keyVal={key} disabled={disabledLetters.includes(key)} />
        ))}
      </div>
      <div className="line2">
        {keys2.map((key) => (
          <Key keyVal={key} disabled={disabledLetters.includes(key)} />
        ))}
      </div>
      <div className="line3">
        <Key keyVal={"ENTER"} bigKey />
        {keys3.map((key) => (
          <Key keyVal={key} disabled={disabledLetters.includes(key)} />
        ))}
        <Key keyVal={"DELETE"} bigKey />
      </div>
    </div>
  );
}

export default Keyboard;
