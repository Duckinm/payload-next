import { Field, SanitizedCollectionConfig } from 'payload/types'
import React from 'react'
import './styles.scss'

type Props = {
  field: Field
  colIndex: number
  collection: SanitizedCollectionConfig
  cellData: unknown
  rowData: {
    [path: string]: unknown
  }
}

const Cell: React.FC<Props> = (props) => {
  const { cellData } = props

  if (!cellData) return null

  return (
    <div className="chip" style={{ backgroundColor: cellData as string }} />
  )
}

export default Cell
