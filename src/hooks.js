import { useState } from "react";
import uuid from "uuid";
import axios from "axios";

const useFlip = () => {
  const [isFacingUp, setIsFacingUp] = useState(true);
  const flip = () => {
    setIsFacingUp((isFacingUp) => !isFacingUp);
  };
  return [isFacingUp, flip];
};

const useAxios = (url) => {
  const [data, setData] = useState([]);
  const addCard = async (name) => {
    url = name !== "" ? `${url}${name}/` : url;
    const response = await axios.get(url);
    setData((data) => [...data, { ...response.data, id: uuid() }]);
  };
  const startOver = () => {
    setData([]);
  };
  return [data, addCard, startOver];
};

export { useFlip, useAxios };
