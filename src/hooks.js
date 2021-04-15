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

const useAxios = (url, dataFormat) => {
  const [data, setData] = useState([]);
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

export { useFlip, useAxios };
