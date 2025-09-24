import React, { useState, useEffect } from "react";
import {
  FindFirstLetter,
  FindSameFirstLetter,
  FindDifferentFirstLetter,
  SortByFirstLetter,
  OrderLetters
} from "./index.js";

import wordList from "../assets/data/words.json";
import instructions from "../assets/data/instructions.json";



// ---------------- Level Config ----------------
const levelConfig = {
  1: { type: "cycle", questionTypes: ["first", "same", "different", "sort"], targets: ["first"] },
  2: { type: "cycle", questionTypes: ["first", "same", "different", "sort"], targets: ["last"] },
  3: { type: "random", questionTypes: ["first", "same", "different", "sort"], targets: ["first", "last"] },
  4: { type: "cycle", questionTypes: ["first", "same", "different", "sort"], targets: ["middle"] },
  5: { type: "random", questionTypes: ["first", "same", "different", "sort", "order"], targets: ["first", "last", "middle"] }
};

// ---------------- Helper Functions ----------------
function randomWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

function getLetter(word, position) {
  if (position === "first") return word.name[0];
  if (position === "last") return word.name[word.name.length - 1];
  if (position === "middle" && word.name.length >= 3) {
    return word.name[Math.floor(word.name.length / 2)];
  }
  return "";
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// ---------------- Generate Word Set ----------------
function generateWordSet(qType, targetWord, targetPosition) {
  const allWords = [...wordList];
  const targetLetter = getLetter(targetWord, targetPosition);

  if (qType === "first" || qType === "order") {
    return { words: [targetWord], letters: [] };
  }

 if (qType === "same") {
    const corrects = allWords.filter(
      (w) => w.name !== targetWord.name && getLetter(w, targetPosition) === targetLetter
    );

    const potentialDistractors = shuffle(
      allWords.filter((w) => getLetter(w, targetPosition) !== targetLetter)
    );
    // ensure distractors have unique letters
    const usedLetters = new Set();
    const distractors = [];
    for (const w of potentialDistractors) {
      const letter = getLetter(w, targetPosition);
      if (!usedLetters.has(letter)) {
        distractors.push(w);
        usedLetters.add(letter);
        if (distractors.length >= 2) break;
      }
    }

    const selectedCorrects = shuffle(corrects).slice(0, 2);

    return { words: shuffle([targetWord, ...selectedCorrects, ...distractors]), letters: [] };
  }

  if (qType === "different") {
    const corrects = allWords.filter(
      (w) => w.name !== targetWord.name && getLetter(w, targetPosition) === targetLetter
    );

   const potentialDistractors = shuffle(
       allWords.filter((w) => getLetter(w, targetPosition) !== targetLetter)
   );
    const usedLetters = new Set();
    const uniqueDistractors = [];
    for (const w of potentialDistractors) {
      const letter = getLetter(w, targetPosition);
      if (!usedLetters.has(letter)) {
        uniqueDistractors.push(w);
        usedLetters.add(letter);
      }
    }

    const oddWord = shuffle(uniqueDistractors)[0]; // pick random distractor
    const selectedCorrects = shuffle(corrects).slice(0, 2);

    return { words: shuffle([targetWord, ...selectedCorrects, oddWord]), letters: [] };
  }
  if (qType === "sort") {
    const groups = {};
    allWords.forEach((w) => {
      const l = getLetter(w, targetPosition);
      if (!groups[l]) groups[l] = [];
      groups[l].push(w);
    });

    const letters = Object.keys(groups)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2 + Math.floor(Math.random() * 2));

    let choices = [];
    letters.forEach((l) => {
      choices = [...choices, ...groups[l].sort(() => 0.5 - Math.random()).slice(0, 2)];
    });

    return { words: shuffle(choices), letters };
  }

  return { words: [targetWord], letters: [] };
}

// ---------------- Question Wrapper ----------------
export default function QuestionWrapper({ difficulty = 5, testType }) {
  const [level, setLevel] = useState(1);
  const [typeIndex, setTypeIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [question, setQuestion] = useState(null);
  const [questionCompleted, setQuestionCompleted] = useState(false);
  // Generate a new question
  function generateQuestion() {
    const config = levelConfig[level];
    const qType = testType
    ? testType
    : config.type === "cycle"
    ? config.questionTypes[typeIndex % config.questionTypes.length]
    : config.questionTypes[Math.floor(Math.random() * config.questionTypes.length)];

    // const qType =
    //   config.type === "cycle"
    //     ? config.questionTypes[typeIndex % config.questionTypes.length]
    //     : config.questionTypes[Math.floor(Math.random() * config.questionTypes.length)];

    const targetPosition =
      config.targets[Math.floor(Math.random() * config.targets.length)];

    const word = randomWord();
    const { words, letters } = generateWordSet(qType, word, targetPosition);

    const instructionAudio =
      qType === "order"
        ? instructions.order.any
        : instructions[qType][targetPosition];

    return {
      type: qType,
      targetPosition,
      word,
      words,
      letters,
      instructionAudio
    };
  }

  // Play instruction audio when question loads
  useEffect(() => {
    if (question?.instructionAudio) {
      const audio = new Audio(question.instructionAudio);
      audio.play();
    }
  }, [question]);

  // Load first question
  useEffect(() => {
    setQuestion(generateQuestion());
  }, [level, typeIndex]);

  // ---------------- Handle Answer ----------------
  function handleAnswer(correct) {
    if (questionCompleted) return; // lock
    if (!correct) {
      setQuestion(generateQuestion());
      return;
    }

    setQuestionCompleted(true);
    const newCount = correctCount + 1;
    setCorrectCount(newCount);

    if (newCount >= difficulty) {
      setCorrectCount(0);
      const config = levelConfig[level];

      if (config.type === "cycle") {
        if (typeIndex + 1 < config.questionTypes.length) {
          setTypeIndex(typeIndex + 1);
        } else {
          setTypeIndex(0);
          setLevel(level + 1);
        }
      } else {
        setLevel(level + 1);
      }
    } else {
      setQuestion(generateQuestion());
    }

    setTimeout(() => setQuestionCompleted(false), 300);
  }

  // ---------------- Render Question ----------------
  if (!question) return <div>Loading...</div>;

  switch (question.type) {
    case "first":
      return <FindFirstLetter question={question} onAnswer={handleAnswer} />;
    case "same":
      return <FindSameFirstLetter question={question} onAnswer={handleAnswer} />;
    case "different":
      return <FindDifferentFirstLetter question={question} onAnswer={handleAnswer} />;
    case "sort":
      return <SortByFirstLetter question={question} onAnswer={handleAnswer} />;
    case "order":
      return <OrderLetters question={question} onAnswer={handleAnswer} />;
    default:
      return <div>Unknown question type</div>;
  }
}


//TODO Timing issues - sometimes items are not yet ready to click
//TODO Sometimes a word from the previous question (or from the next??) appears by itself before the question is fully rendered
//TODO Echo on the audio file for the words
//TODO make word boxes bigger for ease of clicking
//TODO style the words with the CVC colouring