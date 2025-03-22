import FarhackLogo from "@/components/custom/icons/farhack-logo";
import Hackathons from "../components/custom/hackathons";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="text-white flex flex-col gap-4 items-center mt-[5%] md:mt-[6%] p-4 pt-0">
      <FarhackLogo className="max-w-[55%] md:max-w-[27%]" gradient />
      <div className="text-center">
        <p className="text-white text-3xl md:text-5xl mr-4 font-semibold">FarHack</p>
        <p className="text-white text-lg md:text-xl mt-1 mr-4 font-light">The ultimate Farcaster hackathon</p>
      </div>
      <Link href="/#hackathons">
        <button className="bg-[#8A63D2] hover:bg-[#7952C7] text-white font-medium py-2 px-8 rounded-full mt-2 transition-all duration-300">
          Start Hacking
        </button>
      </Link>
      <div className="mt-[15vh] md:mt-[10vh]">
        <Hackathons />
      </div>
    </div>
  );
}