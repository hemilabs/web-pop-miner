import { RouterProvider } from 'react-router-dom'

import './styles/index.css'
import { router } from './router'

export const App = () => (
  <div className="bg-neutral-50">
    <RouterProvider router={router} />
  </div>
)
