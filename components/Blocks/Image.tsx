import { Type } from "blocks/Image"
import { useFirstRender } from "hooks/useFirstRender"
import { useSpacer } from "hooks/useSpacer"
import { useEffect, useState } from "react"

export const Image: React.FC<Type> = ({ grid, spacer, image, type }) => {
  const firstRender = useFirstRender()
  const [marginBottom, marginTop] = useSpacer(spacer)
  const [mt, setMt] = useState("")
  const [mb, setMb] = useState("")

  useEffect(() => {
    if (!firstRender) {
      if (marginTop) setMt(marginTop)
      if (marginBottom) setMb(marginBottom)
    }
  }, [firstRender, marginBottom, marginTop])

  return (
    <div
      className={`${mt} ${mb} ${grid.size == "container" ? "container" : "w-full"}
    ${grid.alignment == "left" ? "justify-start" : "center" ? "justify-center" : "justify-end"} flex items-center`}
    >
      {image && <img src={image.cloudStorageUrl ?? "/media/" + image.filename} alt={image.alt} className={type == "fullscreen" ? "w-full" : "wide" ? "w-auto" : "" + " object-cover"} />}
    </div>
  )
}
