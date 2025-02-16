import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useLoadWordsFromLocalStorage from "@/hooks/useLoadWordsFromLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { guessLetter, startGame, setSelectedWord, addGuess, addWrongGuess, resetGame } from "../store/gameSlice";
import { RootState } from "../store";

export default function GameScreen() {
    useLoadWordsFromLocalStorage();
    const dispatch = useDispatch();
    const router = useRouter();
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

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();

            if ('abcdefghijklmnopqrstuvwxyz'.includes(key)) {
                handleGuess(key);
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [guesses, wrongGuesses, currentWord]);

    const handleGuess = (letter: string) => {
        if (remainingAttempts <= 0 || guesses.includes(letter) || wrongGuesses.includes(letter)) return;

        dispatch(guessLetter(letter));

        if (currentWord && currentWord.includes(letter)) {
            dispatch(addGuess(letter));
        } else {
            dispatch(addWrongGuess(letter));
        }
    };

    const handleReset = () => {
        dispatch(resetGame());
        router.push("/");
    }

    const handleNewGame = () => {
        dispatch(startGame());
    }

    const activeStyle = {
        path: {
            stroke: "#707070",
            strokeWidth: 0.1,
            strokeLineCap: "round"
        },
        circle: {
            fill: "none",
            stroke: "#707070"
        }
    };

    const inactiveStyle = {
        path: {
            stroke: "transparent",
            strokeWidth: 0.1,
            strokeLineCap: "round"
        },
        circle: {
            fill: "none",
            stroke: "transparent"
        }
    }

    const getPathStyle = (attempt: number) => remainingAttempts < attempt ? activeStyle.path : inactiveStyle.path;
    const getCircleStyle = () => remainingAttempts < 6 ? activeStyle.circle : inactiveStyle.circle;

    return (
        <div className="game">
            <div className="game__container">
                <div className="game__container--left">
                    <h1>Hangman Game</h1>
                    {gameStatus === "won" && <p className="game-status success">You've won!</p>}
                    {gameStatus === "lost" && <p className="game-status error">You lost!</p>}
                    <p className="game--guesses">
                        {currentWord?.split("").map((char, index) => (
                            <span
                                key={index}
                                className={guesses.includes(char) ? "guessed" : "not-guessed"}
                            >
                                {guesses.includes(char) ? char : " "}
                            </span>
                        ))}
                    </p>
                    <div className="game--letters">
                        {"abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
                            <button key={letter} onClick={() => handleGuess(letter)} disabled={guesses.includes(letter) || wrongGuesses.includes(letter)}>
                                {letter}
                            </button>
                        ))}
                    </div>
                    <p className="game--remaining">Remaining possibility of failure: <strong>{remainingAttempts}</strong></p>
                    <div className="game__actions">
                        <button onClick={() => { handleReset() }}>End game</button>
                        <button onClick={() => { handleNewGame() }}>Start new game</button>
                    </div>
                </div>
                <div className="game__container--right">
                    <div className={`hangman-container`}>
                        <svg viewBox="0 0 10 12">
                            <path d="M1,11 h8" />
                            <path d="M9,11 v-10" />
                            <path d="M9,1 h-4" />
                            <path d="M5,1 v2" />
                            <circle cx="5" cy="4" r="1" style={getCircleStyle()} />
                            <path d="M5,5 v3" style={getPathStyle(5)} />
                            <path d="M5,5 l-2,2" style={getPathStyle(4)} />
                            <path d="M5,5 l2,2" style={getPathStyle(3)} />
                            <path d="M5,8 l-2,2" style={getPathStyle(2)} />
                            <path d="M5,8 l2,2" style={getPathStyle(1)} />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
