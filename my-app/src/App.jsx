import './App.css'
import ToDoDashboard from './components/ToDoDashboard'
import ToastProvider from './providers/ToastProvider'
import ThemeProvider from './providers/ThemProvider'


function App() {

  return (
    <>

      <ThemeProvider><ToastProvider><ToDoDashboard/></ToastProvider></ThemeProvider>
    </>
  )
}

export default App
