/* eslint-disable @next/next/no-img-element */
import { farhackSDK } from '@/lib/api';
import { Hackathon } from '@/lib/types';
import { CalendarIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default async function HackathonPage() {
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

  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
          <h1 className="text-3xl font-semibold text-black dark:text-white">Hackathons</h1>
        </div>

        <div className="space-y-3">
          {sortedHackathons.map((hackathon) => {
            const startDate = new Date(hackathon.start_date);
            const endDate = new Date(hackathon.end_date);
            const isUpcoming = new Date() < endDate;

            return (
              <Link
                key={hackathon.id}
                href={`/hackathons/${hackathon.slug}`}
                className="block group"
              >
                <div className="bg-gray-900 dark:bg-white rounded-xl overflow-hidden border border-gray-800 dark:border-gray-200 hover:border-gray-600 dark:hover:border-gray-400 transition-all duration-200">
                  <div className="flex items-start p-4">
                    <div className="flex-shrink-0">
                      <img
                        src={hackathon.square_image}
                        alt={hackathon.name}
                        className="w-20 h-20 rounded-lg object-cover ring-1 ring-gray-800/10 dark:ring-gray-200/10"
                      />
                    </div>
                    <div className="ml-5 flex-1">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-medium text-white dark:text-gray-900 group-hover:text-gray-300 dark:group-hover:text-gray-600 transition-colors">
                          {hackathon.name}
                        </h2>
                        {isUpcoming && (
                          <span className="px-3 py-1 text-xs font-medium text-emerald-400 dark:text-emerald-600 bg-emerald-400/10 dark:bg-emerald-600/10 rounded-full ring-1 ring-emerald-400/20 dark:ring-emerald-600/20">
                            Upcoming
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-gray-400 dark:text-gray-600 line-clamp-2">
                        {hackathon.description}
                      </p>
                      <div className="mt-3 flex items-center gap-3 text-xs">
                        <span className="text-gray-500 dark:text-gray-600 flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          {formatDate(startDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}