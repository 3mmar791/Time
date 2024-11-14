import { useState, useEffect } from "react";
import "./App.css";

function Time() {
  const [time, setTime] = useState(0); // Time in seconds
  const [input, setInput] = useState(""); // Input in "MM:SS" format
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Handle input change for the timer
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Parse "MM:SS" input to seconds and set time
  const setTimeFromInput = () => {
    const [minutes, seconds] = input.split(":").map(Number);
    if (!isNaN(minutes) && !isNaN(seconds)) {
      setTime(minutes * 60 + seconds);
    } else {
      alert("Please enter a valid time in MM:SS format");
    }
  };

  // Start countdown
  const startTimer = () => {
    if (time > 0 && !isRunning) {
      const id = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      setIntervalId(id);
      setIsRunning(true);
    }
  };

  // Pause countdown
  const pauseTimer = () => {
    clearInterval(intervalId);
    setIsRunning(false);
  };

  // Reset countdown
  const resetTimer = () => {
    clearInterval(intervalId);
    setIsRunning(false);
    setTimeFromInput();
  };

  // Countdown logic to clear interval and alert when time reaches zero
  useEffect(() => {
    if (time === 0 && isRunning) {
      clearInterval(intervalId);
      setIsRunning(false);
      alert("Time is up!");
    }
  }, [time, isRunning, intervalId]);

  // Format time display as MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="app">
      <h1>TimeMaster</h1>
      <div
        className="timer-display"
        style={{ color: time < 10 ? "red" : "#333333" }}
      >
        {formatTime(time)}
      </div>
      <input
        type="text"
        placeholder="MM:SS"
        value={input}
        onChange={handleInputChange}
        onBlur={setTimeFromInput}
      />
      <div className="controls">
        <button onClick={startTimer} style={{ backgroundColor: "#2ECC71" }}>
          Start
        </button>
        <button onClick={pauseTimer}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default Time;
