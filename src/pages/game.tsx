import React from "react";
import useLoadWordsFromLocalStorage from "@/hooks/useLoadWordsFromLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { guessLetter } from "../store/gameSlice";
import { RootState } from "../store";

export default function GameScreen() {
    useLoadWordsFromLocalStorage();
  const dispatch = useDispatch();
  const { currentWord, guessedLetters, remainingAttempts, gameStatus } = useSelector((state: RootState) => state.game);

  if (!currentWord) return <p>No active game</p>;

  const handleGuess = (letter: string) => {
    dispatch(guessLetter(letter));
  };

  return (
    <div>
      <h1>Hangman</h1>
      <p>Találd ki a szót!</p>
      <p>
        {currentWord.split("").map((char) => (guessedLetters.includes(char) ? char : "_")).join(" ")}
      </p>
      <p>Remaining attempts: {remainingAttempts}</p>
      <div>
        {"abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
          <button key={letter} onClick={() => handleGuess(letter)} disabled={guessedLetters.includes(letter)}>
            {letter}
          </button>
        ))}
      </div>
      <p>{gameStatus === "won" && "Congratulations, you win!"}</p>
      <p>{gameStatus === "lost" && "You lost!"}</p>
    </div>
  );
}
