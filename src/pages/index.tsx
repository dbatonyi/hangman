import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import useLoadWordsFromLocalStorage from "@/hooks/useLoadWordsFromLocalStorage";
import { startGame, setDifficulty } from "../store/gameSlice";

export default function StartScreen() {
  useLoadWordsFromLocalStorage();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleStart = () => {
    dispatch(startGame());
    router.push("/game");
  };

  const handleDifficultyChange = (difficulty: "easy" | "medium" | "hard") => {
    dispatch(setDifficulty(difficulty));
    dispatch(startGame());
  };

  return (
    <div>
      <h1>Hangman</h1>
      <div>
        <button onClick={() => handleDifficultyChange("easy")}>Easy</button>
        <button onClick={() => handleDifficultyChange("medium")}>Medium</button>
        <button onClick={() => handleDifficultyChange("hard")}>Hard</button>
      </div>
      <button onClick={handleStart}>Start</button>
    </div>
  );
}
