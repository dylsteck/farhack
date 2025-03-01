/* eslint-disable @next/next/no-img-element */
import { getHackathons } from "@/db/queries";

interface Hackathon {
  id: number;
  name: string;
  description: string;
  slug: string;
  square_image: string;
  start_date: Date;
  end_date: Date;
  created_at: Date;
}

function HackathonListItem({ hackathon }: { hackathon: Hackathon }) {
  const now = new Date();
  const isLive = now >= new Date(hackathon.start_date) && now <= new Date(hackathon.end_date);
  const dateLabel = isLive ? (
    <span className="flex items-center rounded-xl bg-white px-2.5 text-black">
      <span className="w-2.5 h-2.5 bg-red-600 rounded-full mr-1.5"></span>
      Live
    </span>
  ) : (
    <span className="rounded-xl bg-white px-2.5 text-black">
      {hackathon.start_date.toLocaleString('default', { month: 'long', year: 'numeric' })}
    </span>
  );

  return (
    <div className="m-auto relative">
      <a href={`/hackathons/${hackathon.slug}`}>
        <div className="flex flex-col gap-2 items-center max-w-[300px] w-full">
          <div className="flex justify-between w-full">
            {dateLabel}
          </div>
          <div className="relative">
            <img
              src={hackathon.square_image}
              alt={hackathon.name}
              loading="lazy"
              className="rounded-xl max-w-[100%]"
            />
            <div className="absolute bottom-0 w-full bg-gray-800 bg-opacity-50 p-2 text-center text-white">
              {hackathon.name}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default async function Hackathons() {
  const hackathons: Hackathon[] = await getHackathons() as Hackathon[];
  if (hackathons) {
    hackathons.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
    return (
      <div className="pt-5 md:pt-8">
        <p className="pb-4 text-2xl font-medium text-center">Hackathons</p>
        <div className="flex flex-wrap justify-center items-center gap-10">
          {hackathons.map((hackathon) => (
            <HackathonListItem key={hackathon.id} hackathon={hackathon} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center w-full py-10">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
    </div>
  );
}