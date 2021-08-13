import { Props } from 'payload/components/views/Cell'
import React from 'react'
import './styles.scss'

const Cell: React.FC<Props> = (props) => {
  const { cellData } = props

  if (!cellData) return null

  return (
    <div className="chip" style={{ backgroundColor: cellData as string }} />
  )
}

export default Cell
