"use client"
import {useScaleShow} from "@/animations/General";
import Image from "next/image";
import "../../../styles/equipment.css"
import toast from "react-hot-toast";
import {API_STATIC_URL} from "@/services/api";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";

export default function Equipment() {
  const wrapperRef = useScaleShow();
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle('Ekwipunek');
  }, [])

  return (
      <div ref={wrapperRef} className="equipment">
        <section className="mt-3">
          <h1>Przedmioty</h1>
          <div className="equipment-grid">
            {[1, 2, 3, 4].map((_, i) => (
                <div key={i}>
                  <div key={i} className="equipment-grid-item">
                    <Image
                        src={`${API_STATIC_URL}/images/chests/locked.png`}
                        alt="Locked item"
                        fill
                        className="equipment-img"
                        priority
                        sizes="(min-width: 1024px) 25vw, 50vw"
                    />
                  </div>
                  {/* TODO: to change */}
                  <div className="w-full flex-centered mt-4">
                    <h3 className="text-4xl text-shadow-lg">0/4</h3>
                  </div>
                </div>
            ))}
          </div>
        </section>

        <section className="my-7">
          <h1>Skrzynki</h1>
          <div className="equipment-grid">
            {[1, 2, 3, 4].map((_, i) => (
                <div key={i}>
                  <div key={i} className="equipment-grid-item">
                    <Image
                        src={`${API_STATIC_URL}/images/chests/s1.png`}
                        alt="Chest"
                        fill
                        className="equipment-img"
                        priority
                        sizes="(min-width: 1024px) 25vw, 50vw"
                    />
                  </div>
                  <button className="equipment-open-chest-btn" onClick={() => toast.error("Not implemented")}>
                    <h3 >Otwórz skrzynię</h3>
                  </button>
                </div>
            ))}
          </div>
        </section>
      </div>
  );
}