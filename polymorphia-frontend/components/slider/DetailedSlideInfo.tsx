"use client"

import {SquareMousePointer} from "lucide-react";
import Image from "next/image";
import {useQuery} from "@tanstack/react-query";
import FaqService from "@/services/faq/FaqService";
import {
  ChestQueryResult,
  ItemQueryResult,
} from "@/interfaces/slider/SliderDetailsInterfaces";
import Loading from "@/components/general/Loading";
import {ChestSlide, ItemSlide} from "@/interfaces/slider/SliderInterfaces";
import Link from "next/link";

export default function DetailedSlideInfo({type, ids}: {type: string, ids: number[]}) {
  const itemQueryResult: ItemQueryResult = useQuery({
    queryKey: ["items"],
    queryFn: () => FaqService.getItems(),
    enabled: type === "chest",
  });

  const chestQueryResult: ChestQueryResult = useQuery({
    queryKey: ["chest"],
    queryFn: () => FaqService.getChests(),
    enabled: type === "item",
  });

  let data: ItemSlide[] | ChestSlide[] | undefined;
  let isLoading = true;
  let error: Error | null = null;

  if (type === "chest") {
    data = itemQueryResult.data;
    isLoading = itemQueryResult.isLoading;
    error = itemQueryResult.error;
  } else if (type === "item") {
    data = chestQueryResult.data;
    isLoading = chestQueryResult.isLoading;
    error = chestQueryResult.error;
  }


  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Błąd ładowania {type==='item' ? 'skrzynek' : 'przedmiotów'}: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>Nie znaleziono {type==='item' ? 'skrzynek' : 'przedmiotów'}</div>;
  }

  const filteredData = data.filter((element) => ids.includes(element.id));

  if (filteredData.length === 0) {
    return <div>Brak pasujących {type === 'item' ? 'przedmiotów' : 'skrzynek'}.</div>;
  }


  return (
      <div className={`w-full flex flex-col items-center mt-4 lg:items-end`}>
        <div className="flex items-center my-1 gap-x-1 text-neutral-400">
          <SquareMousePointer size={20} />
          <h3 className="text-xl 2xl:text-2xl">{`Kliknij na ${type==='item' ? 'skrzynkę' : 'przedmiot'} aby dowiedzieć się więcej`}</h3>
        </div>
        <div className="flex flex-wrap gap-4 justify-center lg:justify-end">
          {filteredData.map((element) => {
            const fullData = type === 'item' ? chestQueryResult.data : itemQueryResult.data;
            const goToSlide = fullData?.findIndex((el) => el.id === element.id) ?? 0;

            return (
                <Link
                    href={`/faq/${type === 'item' ? 'chests' : 'items'}?slide=${goToSlide}`}
                    key={element.id}
                >
                  <div className="relative h-20 aspect-square cursor-pointer">
                    <Image
                        src={`/${element.imageUrl}`}
                        fill
                        alt={element.name}
                        className="rounded-xl object-cover shadow-md hover:shadow-3xl"
                    />
                  </div>
                </Link>
            );
          })}
        </div>
      </div>
  )
}