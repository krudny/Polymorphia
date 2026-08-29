"use client";

import "./index.css";
import { useMediaQuery } from "react-responsive";
import TaskDesktop from "@/components/task/desktop";
import TaskMobile from "@/components/task/mobile";
import { useTaskContext } from "@/hooks/contexts/useTaskContext";
import Loading from "@/components/loading";

export default function TasksView() {
  const { isLoading } = useTaskContext();
  const isDesktop = useMediaQuery({ minWidth: "768px" });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-full w-full overflow-hidden p-6">
      {isDesktop ? <TaskDesktop /> : <TaskMobile />}
    </div>
  );
}
