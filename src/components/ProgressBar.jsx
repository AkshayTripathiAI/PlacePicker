import { useState, useEffect } from "react";

export default function ProgressBar({ timer }) {
  const [remainingTime, setRemainingTime] = useState(timer);
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => Math.max(prevTime - 10, 0));
    }, 10);
    return () => {
      clearInterval(interval);      
    };
  }, []);

  return (
    <progress value={remainingTime} max={timer} />
  );
}
