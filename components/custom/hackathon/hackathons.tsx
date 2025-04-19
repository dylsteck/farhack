/* eslint-disable @next/next/no-img-element */
import { getHackathons } from "@/db/queries";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { Hackathon } from "@/lib/types";

function HackathonListItem({ hackathon }: { hackathon: Hackathon }) {
  const now = new Date();
  const isLive = now >= new Date(hackathon.start_date) && now <= new Date(hackathon.end_date);
  const dateLabel = isLive ? (
    <div className="flex items-center gap-2 text-xs font-medium">
      <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
      <span className="text-red-400">Live</span>
    </div>
  ) : (
    <div className="flex items-center gap-2 text-xs text-gray-400">
      <Calendar className="h-3 w-3" />
      {hackathon.start_date.toLocaleString('default', { month: 'long', year: 'numeric' })}
    </div>
  );

  return (
    <Link href={`/hackathons/${hackathon.slug}`} className="w-full group">
      <Card className="flex flex-col sm:flex-row items-start gap-4 p-4 hover:bg-zinc-800 transition-all duration-200 rounded-xl border-zinc-800 bg-zinc-900 group-hover:border-zinc-700 w-full">
        <div className="w-24 aspect-square relative shrink-0 rounded-lg overflow-hidden border border-zinc-800 shadow-md">
          <img
            src={hackathon.square_image}
            alt={hackathon.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-0 flex-1 w-full flex flex-col items-start gap-2">
        <div className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-200">{hackathon.name}</div>
          <>
            {dateLabel}
            {isLive && (
              <Badge variant="outline" className="bg-red-950 text-red-400 border-red-800 text-xs">
                <Clock className="mr-1 h-3 w-3" /> In Progress
              </Badge>
            )}
          </>
        </CardContent>
      </Card>
    </Link>
  );
}

export default async function Hackathons() {
  const hackathons: Hackathon[] = await getHackathons() as Hackathon[];

  if (!hackathons || hackathons.length === 0) {
    return (
      <div className="flex justify-center items-center w-full py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const filteredHackathons = hackathons.filter(h => !h.is_demo).sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());

  return (
    <section id="hackathons" className="min-w-full py-5 md:py-8">
      <div className="w-full max-w-screen mx-auto px-2 sm:px-6 md:px-8">
        <h2 className="text-2xl font-medium mb-6 text-white flex items-center gap-2">
          Hackathons
        </h2>
        <div className="flex flex-col gap-4 w-full">
          {filteredHackathons.map((hackathon) => (
            <HackathonListItem key={hackathon.id} hackathon={hackathon} />
          ))}
        </div>
      </div>
    </section>
  );
}