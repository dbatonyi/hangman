import React, { useState } from 'react';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import useLoadWordsFromLocalStorage from "@/hooks/useLoadWordsFromLocalStorage";
import { addWord } from '@/store/gameSlice';
import { RootState } from '../store';

const AdminPanel = () => {
    useLoadWordsFromLocalStorage();
    const router = useRouter();
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
            <h1>Admin</h1>
            <input
                type="text"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                placeholder="New word"
            />
            <button onClick={handleAddWord}>Add new word</button>
            <button onClick={() => router.push("/")}>Back</button>
            <ul>
                {words.map((word, index) => (
                    <li key={index}>{word}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;
