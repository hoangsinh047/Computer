import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { HomePageWrapper } from './pages/HomePageWrapper'
import { CategoryPageWrapper } from './pages/CategoryPageWrapper'
import { CartPageWrapper } from './pages/CartPageWrapper'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePageWrapper />} />
        <Route path="c/:slug" element={<CategoryPageWrapper />} />
        <Route path="cart" element={<CartPageWrapper />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
