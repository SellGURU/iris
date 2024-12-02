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
    const secretKey ='Hello12345678910'
    const key = CryptoJS.enc.Utf8.parse(secretKey.slice(0, 16));  // 16-byte key (AES-128)
    
    // Generate a random 16-byte IV
    const iv = CryptoJS.lib.WordArray.random(16);
    
    // Encrypt the text using AES-CBC
    const encrypted = CryptoJS.AES.encrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    // Base64 encode the IV and ciphertext
    const encryptedText = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    const ivBase64 = iv.toString(CryptoJS.enc.Base64);

    // Return the base64 encoded IV and encrypted text
    return `${ivBase64}:${encryptedText}`;
  };

export {useConstructor,encryptTextResolver}