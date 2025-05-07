import Image from "next/image";

export default function Equipment() {
  return (
      <div className="w-full md:max-w-5xl mx-auto p-4">
        <section className="mt-3">
          <h1 className="text-6xl mb-6 lg:mb-10">Przedmioty</h1>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((_, i) => (
                <div key={i}>
                  <div key={i} className="relative w-full aspect-square">
                    <Image
                        src="/locked.png"
                        alt="Locked item"
                        fill
                        className="object-cover rounded-2xl shadow-lg"
                        priority
                        sizes="(min-width: 1024px) 25vw, 50vw"
                    />
                  </div>
                  <div className="w-full flex-centered mt-4">
                    <h3 className="text-4xl text-shadow-lg">0/4</h3>
                  </div>
                </div>
            ))}
          </div>
        </section>

        <section className="mt-7">
          <h1 className="text-6xl mb-7 lg:mb-10">Skrzynki</h1>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="flex-col-centered">
                  <div key={i} className="relative w-full aspect-square ">
                    <Image
                        src="/s1.png"
                        alt="Locked item"
                        fill
                        className="object-cover rounded-2xl shadow-lg"
                        priority
                        sizes="(min-width: 1024px) 25vw, 50vw"
                    />
                  </div>
                  <div className="w-full flex-centered bg-neutral-800 mt-4 text-neutral-300 rounded-xl shadow-lg">
                    <h3 className="text-lg lg:text-2xl py-1">Otwórz skrzynię</h3>
                  </div>
                </div>
            ))}

          </div>
        </section>
      </div>
  );
}