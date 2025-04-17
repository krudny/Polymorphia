import Image from "next/image";
export default async function Home() {

  return (
      <div className="w-screen h-[100dvh] flex flex-col justify-center items-center gap-y-8 px-4 text-center">
        <h1 className="text-6xl">Polymorphia</h1>
        <h2 className="text-xl">W nagrodę za dotarcie tutaj otrzymujesz Ananasa i 3.14 punktów!</h2>
        <Image src="/pineapple.png" width="400" height="400" alt="Pineapple" priority />
      </div>
  );
}
