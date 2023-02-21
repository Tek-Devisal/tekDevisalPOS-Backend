// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
require("dotenv").config();

const firebaseConfig = {
  apiKey: "AIzaSyAtXpt-ri0f9PWgiEV_kHL-UAnuX-cEymk",
  authDomain: "tekdevisalpos.firebaseapp.com",
  projectId: "tekdevisalpos",
  storageBucket: "tekdevisalpos.appspot.com",
  messagingSenderId: "102813012118",
  appId: "1:102813012118:web:965741e802d57cb8f4f2b7",
  measurementId: "G-JE7QT4K6SP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
module.exports = app
