
import CryptoES from "crypto-es";
var C = require("crypto-js");

const KEY = "Star*Wars*SWAPI*-Test/2022-03-30";

export const setPassword = (password) => {
  let encrypted = CryptoES.AES.encrypt(password, KEY);
  return encrypted.toString();
};

export const getPassword = (encrypted) => {
  let decrypted = C.AES.decrypt(encrypted, KEY);
  return decrypted.toString(C.enc.Utf8);
};
