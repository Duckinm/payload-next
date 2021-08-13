import { useState } from 'react'
import { BarChart2, X } from 'react-feather'

export const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false)

  return isOpen ? (
    <X onClick={() => setIsOpen(!isOpen)} className="w-8 h-8" />
  ) : (
    <BarChart2
      onClick={() => setIsOpen(!isOpen)}
      className="w-8 h-8 transform -rotate-90"
    />
  )
}
