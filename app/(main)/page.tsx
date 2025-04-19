/* eslint-disable @next/next/no-img-element */
import FarHackLogo from '@/components/custom/icons/farhack-logo';
import { farhackSDK } from '@/lib/api';
import { Hackathon } from '@/lib/types';
import { karla } from '@/lib/utils';
import Link from 'next/link';

export default async function HomePage() {
  const hackathons = await (async () => {
    try {
      return await farhackSDK.getHackathons() as Hackathon[];
    } catch (error) {
      console.error('Failed to fetch hackathons:', error);
      return [];
    }
  })();
  const sortedHackathons = hackathons
    ?.slice()
    .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()) || [];

  return (
    <main>
      <div className={`text-black dark:text-white flex flex-col gap-4 items-center justify-center min-h-screen p-4 pt-0 ${karla.className}`}>
        <FarHackLogo className="max-w-[70%] sm:max-w-[55%] md:max-w-[40%] lg:max-w-[27%]" gradient />
        <div className="text-center ml-4 mt-0.5 md:mt-1">
          <p className="text-black dark:text-white text-3xl md:text-5xl font-semibold">FarHack</p>
          <p className="text-black dark:text-white text-lg md:text-xl mt-1 font-light">The ultimate Farcaster hackathon</p>
        </div>
        <div className="flex flex-col md:flex-row gap-0.5 md:gap-2 items-center ml-4 mt-0.5">
          <Link href="/#hackathons">
            <button className="bg-[#8A63D2] hover:bg-[#7952C7] text-white font-medium py-2 px-8 rounded-full mt-2 transition-all duration-300 cursor-pointer">
              Start Hacking
            </button>
          </Link>
          <Link href="/hacking-guide">
            <button className="bg-black dark:bg-white text-white dark:text-black hover:text-[#8A63D2] font-medium py-2 px-8 rounded-full mt-2 transition-all duration-300 cursor-pointer">
              Hacking Guide
            </button>
          </Link>
        </div>
      </div>
      <section id="hackathons" className="py-8 text-black dark:text-white">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-center md:justify-between mb-10">
            <h2 className="text-2xl font-medium flex items-center gap-2">
              <span>Hackathons</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-none md:flex md:flex-nowrap md:overflow-x-auto md:gap-4 gap-6 w-[90%] mx-auto md:mx-0 md:w-auto">
            {sortedHackathons.length > 0 ? (
              sortedHackathons.map((hackathon) => {
                const startDate = new Date(hackathon.start_date);
                const endDate = new Date(hackathon.end_date);
                const isUpcoming = new Date() < endDate;
                return (
                  <Link
                    key={hackathon.id}
                    href={`/hackathons/${hackathon.slug}`}
                    className="group flex flex-col rounded-xl overflow-hidden md:min-w-[300px] md:w-[300px]"
                  >
                    <div className="relative">
                      <img
                        src={hackathon.square_image}
                        alt={hackathon.name}
                        className="w-full aspect-square object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 w-full">
                No hackathons available
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}