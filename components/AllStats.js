import React, { useState, useEffect } from "react";
import { handleKeyboard } from "../helpers/keyboard";

export const AllStats = () => {
  const [totalWon, setTotalWon] = useState(0);
  const [totalLost, setTotalLost] = useState(0);
  const [abandoned, setAbandoned] = useState(0);

  const [lastResult, setLastResult] = useState("");

  function pauses() {
    console.log("another function taking care of pauses");
  }

  useEffect(() => {
    addEventListener("keydown", (e) => handleKeyboard(e, pauses));
    return () =>
      removeEventListener("keydown", (e) =>
        handleKeyboard(e, pauses)
      );
  }, []);

  return <p>""</p>;
};
