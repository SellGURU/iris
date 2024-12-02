/* eslint-disable no-undef */
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
    // return CryptoJS.AES.encrypt(text.trim(), secretKey).toString();
    const iv = CryptoJS.lib.WordArray.random(16); // Generate random IV
    const encrypted = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(secretKey), {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    // Return the IV and ciphertext concatenated
    return iv.toString(CryptoJS.enc.Base64) + ':' + encrypted.toString();
  };

export {useConstructor,encryptTextResolver}