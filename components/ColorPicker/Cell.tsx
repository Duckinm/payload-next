import React from "react"
import "./styles.scss"

type Props = {
  cellData?: string
}

const Cell: React.FC<Props> = ({ cellData }) => {
  if (!cellData) return null

  return <div className="chip" style={{ backgroundColor: cellData }} />
}

export default Cell
