import React from 'react'
import { useRoutes } from 'react-router-dom'
import { PublicRoutes } from './routes'

const RoutingComponent = () => {
    const renderPublicRoutes = useRoutes(PublicRoutes)
  return (
    <>{renderPublicRoutes}</>
  )
}

export default RoutingComponent