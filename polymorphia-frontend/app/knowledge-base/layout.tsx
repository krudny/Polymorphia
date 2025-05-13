import Image from "next/image";
import {ReactNode, Suspense} from "react";
import Link from "next/link";
import "../../styles/general.css"

export default function KnowledgeBaseLayout({children}: {children: ReactNode}) {
  return (
      <div className="knowledge-base-wrapper">
        <Image
            src="/background.png"
            alt="Background"
            fill
            className="absolute object-cover"
            priority
            sizes="100%"
        />
        <div className="knowledge-base-inner-wrapper ">
          <div>
            <Link href="/"><h3 className="text-4xl">Polymorphia</h3></Link>
          </div>
          <Suspense>
            {children}
          </Suspense>
        </div>
      </div>
  )
}