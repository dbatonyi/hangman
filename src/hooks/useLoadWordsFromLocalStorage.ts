import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadWordsFromLocalStorage } from "@/store/gameSlice";

const useLoadWordsFromLocalStorage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadWordsFromLocalStorage());
  }, [dispatch]);
};

export default useLoadWordsFromLocalStorage;
