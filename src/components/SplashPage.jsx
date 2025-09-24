import React, { useState } from "react";
import QuestionWrapper from "./QuestionWrapper";

export default function SplashPage() {
  const [selectedType, setSelectedType] = useState(null);

  if (selectedType) {
    return <QuestionWrapper testType={selectedType} />;
  }

  return (
    <div>
      <h1>Select a question type to test:</h1>
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button onClick={() => setSelectedType("first")}>Find First Letter</button>
        <button onClick={() => setSelectedType("same")}>Find Same First Letter</button>
        <button onClick={() => setSelectedType("different")}>Find Different First Letter</button>
        <button onClick={() => setSelectedType("sort")}>Sort by Letter</button>
        <button onClick={() => setSelectedType("order")}>Order Letters</button>
      </div>
    </div>
  );
}
