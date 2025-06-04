import {API_STATIC_URL} from "@/services/api";
import Image from "next/image";

export default function RankImage() {
    return (
        <div className="h-full relative aspect-square">
            <Image
                src={`${API_STATIC_URL}/images/evolution-stages/4.jpg`}
                alt="User profile"
                fill
                className="object-cover rounded-tl-xl rounded-bl-xl"
                priority
            />
        </div>
    )
}