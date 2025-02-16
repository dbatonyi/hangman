import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GameState = {
    words: string[];
    currentWord: string | null;
    guessedLetters: string[];
    remainingAttempts: number;
    gameStatus: "not_started" | "playing" | "won" | "lost";
};

const initialState: GameState = {
    words: ["programozás", "typescript", "redux", "javascript", "akasztófa"], // Default words
    currentWord: null,
    guessedLetters: [],
    remainingAttempts: 6,
    gameStatus: "not_started",
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        startGame: (state) => {
            const randomWord = state.words[Math.floor(Math.random() * state.words.length)];
            state.currentWord = randomWord;
            state.guessedLetters = [];
            state.remainingAttempts = 6;
            state.gameStatus = "playing";
        },
        guessLetter: (state, action: PayloadAction<string>) => {
            if (!state.currentWord || state.gameStatus !== "playing") return;

            const letter = action.payload.toLowerCase();
            if (!state.guessedLetters.includes(letter)) {
                state.guessedLetters.push(letter);
                if (!state.currentWord.includes(letter)) {
                    state.remainingAttempts--;
                }
            }

            if (state.remainingAttempts <= 0) {
                state.gameStatus = "lost";
            } else if (state.currentWord.split("").every((char) => state.guessedLetters.includes(char))) {
                state.gameStatus = "won";
            }
        },
        addWord: (state, action: PayloadAction<string>) => {
            if (!state.words.includes(action.payload)) {
                state.words.push(action.payload);
                if (typeof window !== "undefined") {
                    localStorage.setItem('words', JSON.stringify(state.words));
                }
            }
        },
        loadWordsFromLocalStorage: (state) => {
            if (typeof window !== "undefined") {
                const storedWords = localStorage.getItem("words");
                if (storedWords) {
                    state.words = JSON.parse(storedWords);
                }
            }
        },
    },
});

export const { startGame, guessLetter, addWord, loadWordsFromLocalStorage } = gameSlice.actions;
export default gameSlice.reducer;
