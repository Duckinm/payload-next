import type { Type as MediaType } from "collections/Media"
import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"
import { FC, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "react-feather"

export type Props = {
  data?: MediaType[]
  className?: string
  blockType?: string
}

const Slider: FC<Props> = ({ data, className }) => {
  const [pause, setPause] = useState(false)
  const timer = useRef<any>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    },
    loop: true,
    duration: 1000,
    dragStart: () => {
      setPause(true)
    },
    dragEnd: () => {
      setPause(false)
    },
  })

  useEffect(() => {
    sliderRef.current?.addEventListener("mouseover", () => {
      setPause(true)
    })
    sliderRef.current?.addEventListener("mouseout", () => {
      setPause(false)
    })
  }, [sliderRef])

  useEffect(() => {
    timer.current = setInterval(() => {
      if (!pause && slider) {
        slider.next()
      }
    }, 4000)

    return () => {
      clearInterval(timer.current)
    }
  }, [pause, slider])

  return (
    <div className={`relative navigation-wrapper`}>
      <div ref={sliderRef} className={` bg-grey-100 keen-slider ${className}`} style={{ boxShadow: "0px 0px 0px 13px rgba(255,255,255,1)" }}>
        {data?.map((image, key) => (
          <img key={key} src={image.cloudStorageUrl || "/media/" + image.filename} alt={image.alt} placeholder="blur" className="object-cover keen-slider__slide" />
        ))}
      </div>
      {slider && (
        <div className="absolute top-[calc(50%-20px)] md:top-[calc(50%-32px)] flex justify-between w-full">
          <div className="relative left-0 lg:-left-0.5 z-10 p-1 md:p-3 bg-gray-400 shadow-2xl drop-shadow-2xl cursor-pointer">
            <button onClick={() => slider.prev()} disabled={currentSlide === 0}>
              <ChevronLeft className="w-8 h-8 text-white md:w-10 md:h-10" />
            </button>
          </div>
          <div className="absolute right-0 lg:-right-0.5 z-10 p-1 md:p-3 bg-gray-400 shadow-2xl drop-shadow-2xl cursor-pointer">
            <button onClick={() => slider.next()} disabled={currentSlide === slider.details().size - 1}>
              <ChevronRight className="w-8 h-8 text-white md:w-10 md:h-10" />
            </button>
          </div>
        </div>
      )}
      {slider && (
        <div className="justify-center hidden w-full mt-2 space-x-2 sm:flex lg:mt-4 lg:space-x-3">
          {[...Array(slider.details().size).keys()].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  slider.moveToSlideRelative(idx)
                }}
                className={"w-3 h-3 bg-gray-300 rounded-full" + (currentSlide === idx ? " bg-gray-500" : "")}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Slider
