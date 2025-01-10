import { LinkProps } from 'react-router-dom'

interface User {
  name: string
  email: string
  avatar: string
}

interface Team {
  name: string
  logo: React.ElementType
  plan: string
}

interface BaseNavItem {
  title: string
  badge?: string
  icon?: React.ElementType
}

type NavLink = BaseNavItem & {
  url: LinkProps['to']
  items?: never
}

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: LinkProps['to'] })[]
  url?: never
}

type NavItem = NavCollapsible | NavLink

interface NavGroup {
  title: string
  items: NavItem[]
}

interface SidebarData {
  user: User
  teams: Team[]
  navGroups: NavGroup[]
}

interface AuthUser {
    aud: string
    exp: number,
    id: string
    iss: string
    userName: string
    email: string
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
}

export type { SidebarData, NavGroup, NavItem, NavCollapsible, NavLink, AuthUser }