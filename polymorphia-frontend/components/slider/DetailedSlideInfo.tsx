"use client"

import {SquareMousePointer} from "lucide-react";
import Image from "next/image";
import {useQuery} from "@tanstack/react-query";
import {
  ChestQueryResult,
  ItemQueryResult,
} from "@/interfaces/slider/SliderDetailsInterfaces";
import Loading from "@/components/general/Loading";
import {ChestSlide, ItemSlide} from "@/interfaces/slider/SliderInterfaces";
import Link from "next/link";
import "../../styles/slider.css";
import KnowledgeBaseService from "@/services/knowledge-base/KnowledgeBaseService";
import { API_STATIC_URL } from "@/services/api";

export default function DetailedSlideInfo({type, ids}: {type: string, ids: number[]}) {
  const itemQueryResult: ItemQueryResult = useQuery({
    queryKey: ["items", 1],
    queryFn: () => KnowledgeBaseService.getItems(1),
    enabled: type === "chest",
  });

  const chestQueryResult: ChestQueryResult = useQuery({
    queryKey: ["chest", 1],
    queryFn: () => KnowledgeBaseService.getChests(1),
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
      <div className="slide-details">
        <div className="slide-details-info">
          <SquareMousePointer size={20} />
          <h3 className="text-xl 2xl:text-2xl">{`Kliknij na ${type==='item' ? 'skrzynkę' : 'przedmiot'} aby dowiedzieć się więcej`}</h3>
        </div>
        <div className="slide-details-content">
          {filteredData.map((element) => {
            const fullData = type === 'item' ? chestQueryResult.data : itemQueryResult.data;
            const goToSlide = fullData?.findIndex((el) => el.id === element.id) ?? 0;

            return (
                <Link
                    href={`/knowledge-base/${type === 'item' ? 'chests' : 'items'}?slide=${goToSlide}`}
                    key={element.id}
                >
                  <div className="slide-details-image">
                    <Image
                        src={`${API_STATIC_URL}/${element.imageUrl}`}
                        fill
                        alt={element.name}
                        sizes="10vw"
                    />
                  </div>
                </Link>
            );
          })}
        </div>
      </div>
  )
}