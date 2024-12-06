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
  const remainingTime = Math.max(
    0,
    timeUntilStart - (new Date().getTime() - currentTime.getTime())
  );
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
