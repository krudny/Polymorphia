import Image from "next/image";

export default function Profile() {
  return (
      <div className="flex-1  sm:flex-col-centered px-4 w-full">
        <div className="flex-col-centered mt-10 lg:mt-0 w-full sm:flex-row mx-auto lg:w-4/5  ">
          <div className="w-full flex-centered sm:flex-row">
            <div className="relative w-4/5 aspect-square ">
              <Image
                  src="/4.jpg"
                  alt="User profile"
                  fill
                  className="object-cover rounded-2xl shadow-lg"
                  priority
                  sizes="(min-width: 1024px) 25vw, 50vw"
              />
            </div>
          </div>
          <div className="flex-col-centered w-full">
            <h1 className="text-8xl sm:text-6xl md:text-8xl my-4">Kamil Rudny</h1>
            <h2 className="text-7xl sm:text-6xl md:text-7xl">Gerard (65xp)</h2>
            <h3 className="text-4xl my-4">Jesteś 36 na 139 zwierzaków!</h3>
          </div>
        </div>
        <div className="flex-centered w-full h-28 mt-6 lg:-mb-6 bg-yellow-300">
          <h1 className="text-4xl">Duży pasek postępu</h1>
        </div>

      </div>
  )
}