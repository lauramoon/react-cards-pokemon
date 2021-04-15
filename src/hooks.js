import { useState, useEffect } from "react";
import uuid from "uuid";
import axios from "axios";

const useFlip = () => {
  const [isFacingUp, setIsFacingUp] = useState(true);
  const flip = () => {
    setIsFacingUp((isFacingUp) => !isFacingUp);
  };
  return [isFacingUp, flip];
};

const useAxios = (url, dataFormat, category) => {
  const [data, setData] = useLocalStorageState(category, []);
  const addCard = async (name) => {
    url = name !== "" ? `${url}${name}/` : url;
    const response = await axios.get(url);
    console.log(response.data);
    const newData = dataFormat(response.data);
    console.log(newData);
    setData((data) => [...data, { ...newData, id: uuid() }]);
  };
  const startOver = () => {
    setData([]);
  };
  return [data, addCard, startOver];
};

const useLocalStorageState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    let value;
    try {
      value = JSON.parse(
        window.localStorage.getItem(key) || JSON.stringify(defaultValue)
      );
    } catch (e) {
      console.log(e);
      value = defaultValue;
    }
    return value;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export { useFlip, useAxios };
