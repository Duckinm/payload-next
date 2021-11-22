import { Type } from "blocks/Sponsor"
import { useFirstRender } from "hooks/useFirstRender"
import { useSpacer } from "hooks/useSpacer"
import { useEffect, useState } from "react"

export const Sponsor: React.FC<Type> = ({ grid, spacer, content, imageGallery, color }) => {
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
    <div style={{ backgroundColor: color ? color : "#fff" }} className={`${mt} ${mb}`}>
      <div className={`${grid.size == "full" ? "w-full" : "container"}  h-auto py-20`}>
        <div className={`flex flex-col justify-center w-full h-full px-3 mx-auto md:max-w-xl ${grid.alignment == "left" ? "items-start" : "center" ? "items-center" : "items-end"}`}>
          {imageGallery?.map(({ image }, key) => (
            <img src={image ? image.cloudStorageUrl ?? "/media/" + image.filename : ""} alt={image.alt ? image.alt : "sponsors"} className="object-cover w-full h-full mb-20" key={key} />
          ))}

          <h3
            className="mb-5 text-2xl leading-none text-center lg:text-3xl font-minimal "
            style={{
              color: content?.title?.color ? content.title.color : "#000",
            }}
          >
            {content?.title?.text}
          </h3>

          <p
            className="text-2xl leading-none text-center lg:text-3xl font-minimal "
            style={{
              color: content?.description?.color ? content.description.color : "#000",
            }}
          >
            {content?.description?.text}
          </p>
        </div>
      </div>
    </div>
  )
}
