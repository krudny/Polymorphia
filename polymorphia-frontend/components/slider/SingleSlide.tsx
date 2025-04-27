import {SingleSlideProps} from "@/interfaces/slider/SliderInterfaces";
import Image from "next/image";
import NavigationArrow from "@/components/slider/NavigationArrow";
import DetailedSlideInfo from "@/components/slider/DetailedSlideInfo";

export default function SingleSlide({ slide, position, prevSlide, nextSlide }: SingleSlideProps) {
  console.log(slide);
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
          className="absolute top-0 left-0 w-full h-fit flex flex-col pt-10 pb-4 px-6 lg:py-0 lg:h-full lg:flex-row lg:px-16 xl:px-26 2xl:px-36"
          style={getTransformStyle()}
      >
        <div className="w-full h-fit flex items-center justify-center my-6 lg:justify-start lg:my-0 lg:w-fit lg:h-full 2xl:w-2/3 ">
          <div className="relative w-xs aspect-square lg:w-md xl:w-lg 2xl:w-full">
            <Image
                src={`/${slide.imageUrl}`}
                fill
                alt="Carrot image"
                className="rounded-4xl shadow-2xl object-cover"
                sizes="(max-width: 1024px) 400px, (max-width: 1920px) 50vw"
            />
          </div>
        </div>

        <div className="w-full h-full  flex flex-col justify-start lg:justify-evenly items-center lg:ml-6 xl:ml-16 ">
          <div className="flex flex-col justify-between lg:h-[28rem] xl:h-[32rem] 2xl:h-fit">
            <div className="w-full flex flex-col">
              <div className="relative text-center lg:text-right">
                {/* Only mobile arrows */}
                <NavigationArrow direction="left" onClick={prevSlide} className="lg:hidden"/>
                <NavigationArrow direction="right" onClick={nextSlide} className="lg:hidden"/>
                <h1 className="text-4xl md:text-6xl 2xl:text-8xl mb-2">{slide.name}</h1>
                {slide.type === 'item' && (
                    <h2 className="text-2xl lg:text-4xl 2xl:text-5xl">+10% do kategorii zadaniowej</h2>
                )}
                {slide.type === 'evolution-stage' && (
                    <h2 className="text-2xl lg:text-4xl 2xl:text-5xl">{slide.textGrade}</h2>
                )}

              </div>
              <p className="text-justify mt-4 2xl:mt-8 max-w-xl lg:max-w-full text-xl xl:text-2xl 2xl:text-3xl">
                {slide.description}
              </p>
            </div>

            {slide.type === 'item' && (
              <DetailedSlideInfo
                  type={slide.type}
                  ids={slide.chestIds}
              />
            )}
          </div>
        </div>
      </div>
  )
}