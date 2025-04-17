import Image from "next/image";
import {fetchData} from "@/config";

export default async function Home() {
  const data = await fetchData<{ message: string }>("/test");

  return (
      <div className="w-screen h-[100dvh] flex flex-col justify-center items-center gap-y-8 px-4 text-center">
        <h1 className="text-6xl">Polymorphia</h1>
        <h2 className="text-xl">W nagrodę za dotarcie tutaj otrzymujesz Ananasa i 3.14 punktów!</h2>
        <Image src="/pineapple.png" width="400" height="400" alt="Pineapple" priority />
        <h3 className="text-sm">{data.message ? data.message : "Loading..."}</h3>
      </div>
  );
}
