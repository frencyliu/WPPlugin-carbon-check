import { useState, useEffect } from 'react'
import { defaultRouterMetas } from '@/utils'
import { useColor } from '@/hooks'
import { Outlet, useLocation } from 'react-router-dom'

const CustomLayouts = () => {
  const { colorText } = useColor()
  const location = useLocation()
  const pathname = location.pathname
  const [
    title,
    setTitle,
  ] = useState<string>('')

  useEffect(() => {
    console.log('⭐  defaultRouterMetas:', pathname, defaultRouterMetas)

    const newTitle =
      defaultRouterMetas.find((item) => item.path === pathname)?.title || ''
    setTitle(newTitle)
  }, [pathname])

  return (
    <div className="w-full flex flex-col">
      <h1 style={{ color: colorText }} className="text-2xl my-8">
        {title}
      </h1>
      <Outlet />
    </div>
  )
}

export default CustomLayouts
