import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "../store";
import useLoadWordsFromLocalStorage from "@/hooks/useLoadWordsFromLocalStorage";
import { startGame, setDifficulty } from "../store/gameSlice";

export default function StartScreen() {
  useLoadWordsFromLocalStorage();
  const dispatch = useDispatch();
  const { difficulty } = useSelector((state: RootState) => state.game);
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
    <div className="dashboard">
      <div className="dashboard__container">
        <h1>Hangman Game</h1>
        <div className="dashboard__difficulty-container">
          <p>Choose a difficulty level</p>
          <div className="difficulty-level">
            <button className={`difficulty-level--option${difficulty === "easy" ? " active-option" : ""}`} onClick={() => handleDifficultyChange("easy")}>Easy</button>
            <button className={`difficulty-level--option${difficulty === "medium" ? " active-option" : ""}`} onClick={() => handleDifficultyChange("medium")}>Medium</button>
            <button className={`difficulty-level--option${difficulty === "hard" ? " active-option" : ""}`} onClick={() => handleDifficultyChange("hard")}>Hard</button>
          </div>
        </div>
        <button className="dashboard--btn" onClick={handleStart}>Start</button>
      </div>
    </div>
  );
}