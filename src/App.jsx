
import './App.css'
import { StockContextProvider } from './StockContext'
import { Stock } from './Stock'

function App() {

  return (
    <StockContextProvider>
      <Stock />
    </StockContextProvider>
  )

}

export default App
