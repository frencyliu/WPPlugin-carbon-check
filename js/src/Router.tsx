import CustomLayouts from '@/components/CustomLayouts'
import DefaultPage from '@/pages/'
import Create from '@/pages/Create'
import Check from '@/pages/Check'
import { createHashRouter } from 'react-router-dom'

export const defaultRouters = createHashRouter([
  {
    path: '',
    element: <CustomLayouts />,
    children: [
      {
        path: '/',
        element: <DefaultPage />,
      },
      {
        path: '/create',
        element: <Create />,
      },
      {
        path: '/check',
        element: <Check />,
      },
    ],
  },
])
