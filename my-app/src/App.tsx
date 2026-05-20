import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Header from './component/header'

// Lazy load pages
const LoginPage = lazy(() => import('./pages/LoginPage'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Register = lazy(() => import('./pages/register'))
const PatientsDetails = lazy(() => import('./pages/patientsDetails'))
const ClivicianDetails = lazy(() => import('./pages/clivinicDetail'))

// Loading component
const LoadingFallback = () => (
  <div className="flex justify-center items-center h-screen">
    <span className="loading loading-spinner loading-lg"></span>
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<LoadingFallback />}>
            <LoginPage />
          </Suspense>
        } />
        <Route path="/register" element={
          <Suspense fallback={<LoadingFallback />}>
            <Register />
          </Suspense>
        } />

        <Route path="/dashboard" element={<Header />}>
          <Route index element={
            <Suspense fallback={<LoadingFallback />}>
              <Dashboard />
            </Suspense>
          } />
        </Route>
        <Route path="/patientsDetails" element={<Header />}>
          <Route index element={
            <Suspense fallback={<LoadingFallback />}>
              <PatientsDetails />
            </Suspense>
          } />
        </Route>
        <Route path="/clivinicDetail" element={<Header />}>
          <Route index element={
            <Suspense fallback={<LoadingFallback />}>
              <ClivicianDetails />
            </Suspense>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;