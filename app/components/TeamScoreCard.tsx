const TeamScoreCard = () => {
  return (
    <div className="flex gap-4 px-6 py-6 rounded-lg  bg-blue-700">
      <div className="w-24 h-24 text-lg bg-white rounded-full relative justify-center flex items-center">
        <div className="absolute z-20 w-6 h-6 rounded-full bg-red-500 bottom-0 translate-y-3">
          <p className="flex h-full items-center justify-center  text-sm font-bold text-white">
            1
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="font-bold text-sm text-white">Team 1</p>
        <p className="uppercase text-2xl font-bold text-white">Maskara</p>
        <div className="mr-auto rounded-lg bg-white mt-1">
          <p className="text-lg px-4 tracking-wider font-bold text-red-700">
            452
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamScoreCard;
