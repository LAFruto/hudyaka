export const CountdownTimer = ({
  timeUntilStart,
  currentTime,
}: {
  timeUntilStart: number;
  currentTime: Date;
}) => {
  const remainingTime = Math.max(
    0,
    timeUntilStart - (new Date().getTime() - currentTime.getTime())
  );
  const hours = Math.floor(remainingTime / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  return (
    <div className="flex justify-center text-center self-center px-4 text-nowrap lg:px-6 py-1 w-full text-blue-800 border md:text-lg font-semibold rounded-full cursor-pointer group">
      {`Starting in ${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
    </div>
  );
};
