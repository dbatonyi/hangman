import React, { useState } from 'react';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import useLoadWordsFromLocalStorage from "@/hooks/useLoadWordsFromLocalStorage";
import { addWord } from '@/store/gameSlice';
import { RootState } from '../store';

const AdminPanel = () => {
    useLoadWordsFromLocalStorage();
    const router = useRouter();
    const [newWord, setNewWord] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const words = useSelector((state: RootState) => state.game.words);
    const dispatch = useDispatch();

    const handleInput = (value: string) => {
        setErrorMessage("");
        setNewWord(value);
    }

    const handleAddWord = () => {
        if (newWord.length < 6 || newWord.length > 14) {
            setErrorMessage("The number of characters must be between 6 and 14")
            return;
        }

        if (words.includes(newWord)) {
            setErrorMessage('That word already exists!');
            return;
        }

        dispatch(addWord(newWord));
        setNewWord('');
    };

    return (
        <div className='admin'>
            <h1>Admin</h1>
            <div className='admin__container'>
                <div className='admin__container--left'>
                    <p>Type the word you want to add to the list</p>
                    <input
                        type="text"
                        value={newWord}
                        onChange={(e) => handleInput(e.target.value)}
                        placeholder="New word"
                    />
                    {errorMessage && <p className='error'>{errorMessage}</p>}
                    <button onClick={handleAddWord}>Save</button>
                    <button onClick={() => router.push("/")}>Back</button>
                </div>
                <div className='admin__container--right'>
                    <ul>
                        {words.map((word, index) => (
                            <li key={index}>{word}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
