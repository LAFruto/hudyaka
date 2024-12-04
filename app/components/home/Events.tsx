import Arrow from "../icons/Arrow";
import Festival from "../icons/Festival";
import { Image } from "../Image";

const Events = () => {
  return (
    <section
      id="events"
      className="bg-yellow-500 w-full padding-container mx-auto py-24"
    >
      <div className="max-container padding-container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="flex flex-col items-center justify-center text-white relative bg-yellow-600 rounded-xl">
            <div className="w-[100px] h-[100px] sm:w-[160px] sm:h-[160px]">
              <Festival color="white" />
            </div>
            <div className="flex flex-col items-center justify-center text-white w-full gap-2">
              <p className="font-bold text-3xl sm:text-4xl lg:text-5xl">
                Events
              </p>
              <p className="text-base sm:text-lg">Remaining Events: 1</p>
            </div>
          </div>

          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 aspect-square flex items-center justify-between flex-col"
            >
              <div className="mt-6">
                <Image
                  src="/event.png"
                  height={1024}
                  width={1024}
                  className=""
                />
              </div>
              <div className="flex items-center justify-between px-4 lg:px-6 py-2 w-full text-white bg-blue-800  md:text-lg font-semibold rounded-full cursor-pointer group">
                <div className="h-4 sm:h-6 overflow-hidden mr-2">
                  <div className="transform transition-transform duration-300 ease-in-out group-hover:-translate-y-1/2">
                    <p className="text-xs text-nowrap sm:text-base h-4 sm:h-6">
                      Results are out!
                    </p>
                    <p className="text-xs text-nowrap sm:text-base h-4 sm:h-6">
                      Results are out!
                    </p>
                  </div>
                </div>
                <div className="w-3 h-3 -rotate-45 group-hover:translate-x-2 transform transition-transform duration-300 ease-in-out">
                  <Arrow />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
