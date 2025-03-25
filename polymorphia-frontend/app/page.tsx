import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-[100dvh] flex flex-col justify-center items-center">
      <h1 className="text-6xl my-10">Polymorphia</h1>
      <h2 className="text-xl text-center px-4">W nagrodę za dotarcie tutaj otrzymujesz Ananasa i 3.14 punktów!</h2>
      <Image src="/pineapple.png" width="400" height="400" alt="Pineapple" />
    </div>
  );
}
