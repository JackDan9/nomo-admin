import React from 'react'
import { Link } from 'react-router-dom'
import SvgIcon, { IconName } from '@/components/Base/SvgIcon'

interface NavLinkProps {
  path: string
  icon?: IconName
  title: string
}

const NavLink: React.FC<NavLinkProps> = ({ path, icon, title }) => {
  return (
    <Link to={path}>
      {icon ? <SvgIcon name={icon} /> : null}
      <span>{title}</span>
    </Link>
  )
}

export default NavLink;