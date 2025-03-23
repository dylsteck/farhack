import FarHackLogo from "@/components/custom/icons/farhack-logo";
import Hackathons from "../components/custom/hackathons";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="text-white flex flex-col gap-4 items-center mt-[12%] md:mt-[6%] p-4 pt-0">
      <FarHackLogo className="max-w-[70%] md:max-w-[35%] lg:max-w-[25%]" gradient />
      <div className="text-center">
        <p className="text-white text-3xl md:text-5xl mr-4 font-semibold">FarHack</p>
        <p className="text-white text-lg md:text-xl mt-1 mr-4 font-light">The ultimate Farcaster hackathon</p>
      </div>
      <div className="flex flex-col md:flex-row gap-0.5 md:gap-2 items-center">
        <Link href="/#hackathons">
          <button className="bg-[#8A63D2] hover:bg-[#7952C7] text-white font-medium py-2 px-8 rounded-full mt-2 transition-all duration-300">
            Start Hacking
          </button>
        </Link>
        <Link href="/hacking-guide">
        <button className="bg-white text-black hover:text-[#8A63D2] font-medium py-2 px-8 rounded-full mt-2 transition-all duration-300">
          Hacking Guide
        </button>
      </Link>
      </div>
      <div className="mt-[15vh] md:mt-[10vh]">
        <Hackathons />
      </div>
    </div>
  );
}