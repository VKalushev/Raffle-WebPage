import { useState, useEffect } from "react";

const Countdown = ({ drawDate, onStatusChange }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(drawDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { expired: true };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Update the status when the countdown changes to "Expired"
    if (timeLeft.expired) {
      onStatusChange("Expired");
    }

    // Clear the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div>
      {timeLeft.expired ? (
        <span>Expired</span>
      ) : (
        <span>
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      )}
    </div>
  );
};

export default Countdown;
