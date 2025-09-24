import './App.css'
import React from "react";
import QuestionWrapper from "./components/QuestionWrapper";
import SplashPage from "./components/SplashPage.jsx";

// function App() {
//   return (
//     <div className="App">
//       <h1 className="text-2xl text-center mb-4">Phonics Fun 🎵</h1>
//       <SplashPage />
//     </div>
//   );
// }

function App() {
  return (
    <div className="App">
      <h1 className="text-2xl text-center mb-4">Phonics Fun 🎵</h1>
      <QuestionWrapper />
    </div>
  );
}

export default App;



//TODO fix letter images to all be same height
//TODO change file type of images to all be the same
//TODO get images for all remaining words
//TODO fix mixed up letter sounds
//TODO components/pages for different types of quiz

//
// Click first/middle/last letter
// Match words that share first/middle/last letter
// sort by first/middle/last letter
// Identify word to match picture
// Identify letter to complete word
// Identify picture to match word
// Identify word to match audio
// Identify audio to match word
