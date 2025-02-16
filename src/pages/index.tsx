import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { startGame } from "../store/gameSlice";

export default function StartScreen() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleStart = () => {
    dispatch(startGame());
    router.push("/game");
  };

  return (
    <div>
      <h1>Akasztófa Játék</h1>
      <button onClick={handleStart}>Játék Indítása</button>
    </div>
  );
}
