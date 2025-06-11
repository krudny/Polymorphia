import "../../styles/general.css"

// TODO: variants?
export default function ImageBadge({number, className}: {number: number, className?: string}) {
  return (
    <div className={`image-badge ${className}`}>
      <h1>
        {number < 10 ? "0" + number : number}
      </h1>
    </div>
  )
}