import { useState } from "react";
// import CryptoJS from 'crypto-js';

const useConstructor = (callBack = () => {}) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) {
    return;
  }
  callBack();
  setHasBeenCalled(true);
};

  const encryptTextResolver= (text) => {
    console.log(text)
    const secretKey = 'amir'
    return CryptoJS.AES.encrypt(text.trim(), secretKey).toString();

  };

export {useConstructor,encryptTextResolver}