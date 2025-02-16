import React, { useEffect } from "react";
import useLoadWordsFromLocalStorage from "@/hooks/useLoadWordsFromLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { guessLetter, startGame, setSelectedWord, addGuess, addWrongGuess } from "../store/gameSlice";
import { RootState } from "../store";

export default function GameScreen() {
    useLoadWordsFromLocalStorage();
    const dispatch = useDispatch();
    const { words, currentWord, guesses, wrongGuesses, remainingAttempts, gameStatus } = useSelector((state: RootState) => state.game);

    useEffect(() => {
        if (words.length > 0 && !currentWord) {
          const storedGameState = localStorage.getItem('gameState');
      
          if (storedGameState) {
            const gameState = JSON.parse(storedGameState);
            if (gameState.gameStatus === "won" || gameState.gameStatus === "lost") {
              dispatch(startGame());
            } else if (gameState.currentWord) {
              dispatch(setSelectedWord(gameState.currentWord));
            } else {
              dispatch(startGame());
            }
          } else {
            dispatch(startGame());
          }
        }
      }, [words, currentWord, dispatch]);      

      const handleGuess = (letter: string) => {
        if (remainingAttempts <= 0 || guesses.includes(letter) || wrongGuesses.includes(letter)) return;
    
        dispatch(guessLetter(letter));
        
        if (currentWord && currentWord.includes(letter)) {
          dispatch(addGuess(letter));
        } else {
          dispatch(addWrongGuess(letter));
        }
      };

    if (!currentWord) return <p>No active game</p>;

    console.log(currentWord)

    return (
        <div>
            <h1>Hangman</h1>
            <p>Guess the word!</p>
            <p>
                {currentWord.split("").map((char) => (guesses .includes(char) ? char : "_")).join(" ")}
            </p>
            <p>Remaining attempts: {remainingAttempts}</p>
            <div>
                {"abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
                    <button key={letter} onClick={() => handleGuess(letter)} disabled={guesses .includes(letter)}>
                        {letter}
                    </button>
                ))}
            </div>
            <p>{gameStatus === "won" && "Congratulations, you win!"}</p>
            <p>{gameStatus === "lost" && "You lost!"}</p>
        </div>
    );
}
