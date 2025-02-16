import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GameState = {
    words: string[];
    currentWord: string | null;
    guesses: string[];
    wrongGuesses: string[];
    remainingAttempts: number;
    gameStatus: "not_started" | "playing" | "won" | "lost";
};

const initialState: GameState = {
    words: ["programozás", "typescript", "redux", "javascript", "akasztófa"],
    currentWord: null,
    guesses: [],
    wrongGuesses: [],
    remainingAttempts: 6,
    gameStatus: "not_started",
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
        startGame: (state) => {
            const randomWord = state.words[Math.floor(Math.random() * state.words.length)];
            state.currentWord = randomWord;
            state.guesses = [];
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

export const { startGame, setSelectedWord, guessLetter, addWord, addGuess, addWrongGuess, loadWordsFromLocalStorage } = gameSlice.actions;
export default gameSlice.reducer;
