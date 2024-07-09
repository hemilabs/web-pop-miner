import { Layout } from 'components/layout'
import { ExplorerPage } from 'pages/explorer/page'
import { FundPage } from 'pages/fund/page'
import { ManagePage } from 'pages/manage/page'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    {/* Step 1 */}
    <Route path="manage" element={<ManagePage />} />
    {/* Step 2 */}
    <Route path="fund" element={<FundPage />} />
    {/* Step 3 */}
    <Route path="explorer" element={<ExplorerPage />} />
  </Route>,
)

export const router = createBrowserRouter(routes)
