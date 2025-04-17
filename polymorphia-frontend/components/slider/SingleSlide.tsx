import {SingleSlideProps} from "@/interfaces/slider/SliderInterfaces";
import Image from "next/image";
import NavigationArrow from "@/components/slider/NavigationArrow";


export default function SingleSlide({ slide, position, prevSlide, nextSlide }: SingleSlideProps) {
  const getTransformStyle = () => {
    return {
      transform: `translateX(${position * 100}%)`,
      transition: 'all 700ms cubic-bezier(0.34, 1, 0.2, 1)',
      opacity: position === 0 ? 1 : 0.3,
      filter: position === 0 ? 'blur(0)' : 'blur(2px)',
      scale: position === 0 ? '1' : '0.95',

      '@media (maxWidth: 768px)': {
        transition: 'all 700ms cubic-bezier(0.34, 1, 0.2, 1)',
      }
    };
  };

  return (
      <div
          className={`absolute top-0 left-0 w-full h-full md:px-10 lg:px-24 xl:px-32`}
          style={getTransformStyle()}
      >
        <div className="h-full px-6 py-4">

          <div className="flex flex-col h-full items-center md:flex-row">
            <div className="relative aspect-square w-2/3 mx-auto mt-16 md:mx-16 md:mt-0 rounded-3xl overflow-hidden">
              <Image
                  src={`/${slide.img_url}`}
                  alt={slide.name}
                  priority
                  fill
                  className="object-cover"
                  sizes="100%"
              />
            </div>

            <div className="md:w-4xl 2xl:w-7xl md:flex md:flex-col md:justify-center md:-mb-10">
              <div className="w-full flex flex-col justify-center items-center md:items-end relative my-4">
                {/* Only mobile arrows */}
                <NavigationArrow direction="left" onClick={prevSlide} className="md:hidden"/>
                <NavigationArrow direction="right" onClick={nextSlide} className="md:hidden"/>
                <h1 className="text-4xl md:text-6xl xl:text-8xl">{slide.name}</h1>
              </div>

              <div className="w-full flex-shrink-0 min-h-64">
                <p className="text-md text-justify md:text-xl lg:text-2xl">{slide.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}