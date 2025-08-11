"use client"

import {useParams} from "next/navigation";
import {EventSectionType} from "@/components/course/event-section/types";
import GradingTestView from "@/views/grading/test";

export default function Grading() {
    const params = useParams();
    const gradableEventId = Number(params.gradableEventId);
    const eventSectionType = params.eventSectionType as EventSectionType;

    switch (eventSectionType) {
        case EventSectionType.TEST:
            return (
                <GradingTestView />
            );
        case EventSectionType.ASSIGNMENT:
            return null;
        case EventSectionType.PROJECT:
            return null;
    }
}