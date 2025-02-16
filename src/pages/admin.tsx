import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useLoadWordsFromLocalStorage from "@/hooks/useLoadWordsFromLocalStorage";
import { addWord } from '@/store/gameSlice';
import { RootState } from '../store';

const AdminPanel = () => {
    useLoadWordsFromLocalStorage();
    const [newWord, setNewWord] = useState('');
    const words = useSelector((state: RootState) => state.game.words);
    const dispatch = useDispatch();

    const handleAddWord = () => {
        if (newWord.length < 6 || newWord.length > 14) {
            console.error("The number of characters must be between 6 and 14")
            return;
        }

        if (words.includes(newWord)) {
            alert('That word already exists!');
            return;
        }

        dispatch(addWord(newWord));
        setNewWord('');
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <input
                type="text"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                placeholder="Új szó"
            />
            <button onClick={handleAddWord}>Szó hozzáadása</button>

            <h2>Szókészlet</h2>
            <ul>
                {words.map((word, index) => (
                    <li key={index}>{word}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;
