import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import Link from '../Link'

export const changeVariant = import.meta.glob('./bench/change-variant/*.tsx', { eager: true })

export default function Home() {
  const { pathname } = useLocation()
  const router = useNavigate()

  useEffect(() => {
    if (pathname === '/styil/benchmark/change-variant') {
      router('stitches-react-vc17')
    }
  }, [pathname, router])

  return (
    <div>
      <ul>
        <li>
          <Link to="stitches-react-vc17">Stitches React</Link>
        </li>
        <li>
          <Link to="styled-components">Styled Components</Link>
        </li>
        <li>
          <Link to="styil-react">styil-react</Link>
        </li>
        <li>
          <Link to="emotion">Emotion</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  )
}
