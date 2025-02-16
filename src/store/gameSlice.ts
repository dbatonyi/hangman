import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GameState = {
    words: string[];
    currentWord: string | null;
    guesses: string[];
    wrongGuesses: string[];
    remainingAttempts: number;
    gameStatus: "not_started" | "playing" | "won" | "lost";
    difficulty: "easy" | "medium" | "hard";
};

const initialState: GameState = {
    words: process.env.NEXT_PUBLIC_WORDS ? process.env.NEXT_PUBLIC_WORDS.split(",") : [],
    currentWord: null,
    guesses: [],
    wrongGuesses: [],
    remainingAttempts: process.env.NEXT_PUBLIC_ATTEMPTS ? Number(process.env.NEXT_PUBLIC_ATTEMPTS) : 6,
    gameStatus: "not_started",
    difficulty: "easy",
};

// Helper function to save game state to localStorage
const saveToLocalStorage = (state: GameState) => {
    const { words, ...stateWithoutWords } = state;
    localStorage.setItem('gameState', JSON.stringify(stateWithoutWords));
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setSelectedWord: (state, action: PayloadAction<string>) => {
            state.currentWord = action.payload;
            saveToLocalStorage(state);
        },
        setDifficulty: (state, action: PayloadAction<"easy" | "medium" | "hard">) => {
            state.difficulty = action.payload;
            saveToLocalStorage(state);
        },
        startGame: (state) => {
            let filteredWords = [];
            switch (state.difficulty) {
                case "easy":
                    filteredWords = state.words.filter(word => word.length >= 6 && word.length <= 8);
                    break;
                case "medium":
                    filteredWords = state.words.filter(word => word.length >= 9 && word.length <= 12);
                    break;
                case "hard":
                    filteredWords = state.words.filter(word => word.length >= 13 && word.length <= 14);
                    break;
            }

            if (filteredWords.length === 0) filteredWords = state.words;

            const randomWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
            state.currentWord = randomWord;
            state.guesses = [];
            state.wrongGuesses = [];
            state.remainingAttempts = 6;
            state.gameStatus = "playing";
            saveToLocalStorage(state);
        },
        guessLetter: (state, action: PayloadAction<string>) => {
            if (!state.currentWord || state.gameStatus !== "playing") return;

            const letter = action.payload.toLowerCase();
            if (state.guesses.includes(letter)) return;

            state.guesses.push(letter);

            if (!state.currentWord.includes(letter)) {
                state.remainingAttempts--;
            }

            if (state.remainingAttempts <= 0) {
                state.gameStatus = "lost";
            } else {
                const allGuessed = state.currentWord.split("").every((char) => state.guesses.includes(char));
                if (allGuessed) {
                    state.gameStatus = "won";
                }
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
        addGuess: (state, action: PayloadAction<string>) => {
            state.guesses.push(action.payload);
            saveToLocalStorage(state);
        },
        addWrongGuess: (state, action: PayloadAction<string>) => {
            state.wrongGuesses.push(action.payload);
            saveToLocalStorage(state);
        },
        resetGame: (state) => {
            state.currentWord = '';
            state.guesses = [];
            state.wrongGuesses = [];
            state.remainingAttempts = 6;
            state.gameStatus = "not_started",
                state.difficulty = "easy",
                saveToLocalStorage(state);
        },
        loadWordsFromLocalStorage: (state) => {
            if (typeof window !== "undefined") {
                const storedWords = localStorage.getItem("words");
                const storedGameState = localStorage.getItem("gameState");
                if (storedWords) {
                    state.words = JSON.parse(storedWords);
                }
                if (storedGameState) {
                    const parsedGameState = JSON.parse(storedGameState);

                    if (parsedGameState.gameStatus === "won" || parsedGameState.gameStatus === "lost") {
                        const { words, ...stateWithoutWords } = initialState;
                        Object.assign(state, stateWithoutWords);
                        return;
                    }

                    state.difficulty = parsedGameState.difficulty ?? "easy";
                    state.currentWord = parsedGameState.currentWord ?? null;
                    state.guesses = parsedGameState.guesses ?? [];
                    state.wrongGuesses = parsedGameState.wrongGuesses ?? [];
                    state.gameStatus = parsedGameState.gameStatus ?? "not_started";
                    state.remainingAttempts = parsedGameState.remainingAttempts ?? 6;
                }
            }
        },
    },
});

export const { startGame, setDifficulty, setSelectedWord, guessLetter, addWord, addGuess, addWrongGuess, loadWordsFromLocalStorage, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
