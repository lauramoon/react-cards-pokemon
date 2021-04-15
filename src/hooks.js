const { useState } = require("react");

const useFlip = () => {
  const [isFacingUp, setIsFacingUp] = useState(true);
  const flip = () => {
    setIsFacingUp((isFacingUp) => !isFacingUp);
  };
  return [isFacingUp, flip];
};

export default useFlip;
