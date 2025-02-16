import gameReducer, { addWord, startGame, setDifficulty, setSelectedWord, guessLetter, resetGame, loadWordsFromLocalStorage } from '../src/store/gameSlice';
import { GameState } from '../src/store/gameSlice'; 

const initialState: GameState = {
    words: ["programozás", "typescript"],
    currentWord: null,
    guesses: [],
    wrongGuesses: [],
    remainingAttempts: 6,
    difficulty: "easy",
    gameStatus: "not_started", 
};

describe('gameSlice reducer', () => {
    it('should add a new word to words array', () => {
        const newState = gameReducer(initialState, addWord("javascript"));
        expect(newState.words).toContain("javascript");
    });

    it('should not add a word if it already exists', () => {
        const newState = gameReducer(initialState, addWord("typescript"));
        expect(newState.words).toEqual(initialState.words);
    });

    it('should set selected word', () => {
        const newState = gameReducer(initialState, setSelectedWord("react"));
        expect(newState.currentWord).toBe("react");
    });

    it('should set difficulty', () => {
        const newState = gameReducer(initialState, setDifficulty("medium"));
        expect(newState.difficulty).toBe("medium");
    });

    it('should start the game and set the current word', () => {
        const newState = gameReducer(initialState, startGame());
        expect(newState.gameStatus).toBe("playing");
        expect(newState.currentWord).not.toBeNull();
        expect(newState.remainingAttempts).toBe(6);
    });
});
