import React from 'react'
import { Navigate, useParams } from 'react-router-dom'

export const NavigateComponent = ({to}) => {
  const { id } = useParams()
  return (
    <Navigate to={to} state={{ service: id }} />
  )
}
