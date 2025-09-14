"use client"

import {useTitle} from "@/components/navigation/TitleContext";
import {useEffect} from "react";

export default function Dashboard() {
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Podsumowanie kursu");
  }, [setTitle]);


  return (
    <div className="m-auto text-4xl">
      Tu kiedyś będzie dashboard instruktora
    </div>
  )
}