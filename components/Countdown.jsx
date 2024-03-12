import { useState, useEffect} from "react";

const Countdown = ({ drawDate }) => {
    const [countdown, setCountdown] = useState('');
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        const now = new Date();
        const endDate = new Date(drawDate);
        const timeDifference = endDate.getTime() - now.getTime();
  
        if (timeDifference > 0) {
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
          setCountdown(`${days} days : ${hours} hours : ${minutes} mins : ${seconds} secs`);
        } else {
          setCountdown('Expired');
          clearInterval(intervalId);
        }
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    return <span>{countdown}</span>;
  };

export default Countdown;