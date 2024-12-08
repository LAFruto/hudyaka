import { useEffect, useState } from "react";

interface CountdownTimerProps {
  timeUntilStart: number;
  currentTime: Date;
  className?: string;
}

export const CountdownTimer = ({
  timeUntilStart,
  currentTime,
  className,
}: CountdownTimerProps) => {
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    const calculateRemainingTime = () => {
      const now = new Date();
      return Math.max(
        0,
        timeUntilStart - (now.getTime() - currentTime.getTime())
      );
    };

    setRemainingTime(calculateRemainingTime());

    const timer = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [timeUntilStart, currentTime]);

  if (remainingTime === null) {
    return <div className={className}>Starting in 00:00:00</div>;
  }

  const hours = Math.floor(remainingTime / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  return (
    <div className={className}>
      {`Starting in ${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
    </div>
  );
};
