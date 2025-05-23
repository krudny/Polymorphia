
import {ReactNode, Suspense} from "react";
import "../../../styles/general.css"

export default function KnowledgeBaseLayout({children}: {children: ReactNode}) {
  return (
      <div className="knowledge-base-wrapper">
          <Suspense>
            {children}
          </Suspense>
      </div>
  )
}