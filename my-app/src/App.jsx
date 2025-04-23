import './App.css'
import ToDoDashboard from './components/ToDoDashboard'
import ThemeProvider from './providers/ThemProvider'


function App() {

  return (
    <>

      <ThemeProvider><ToDoDashboard/></ThemeProvider>
    </>
  )
}

export default App
