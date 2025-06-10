import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import LaptopList from "./pages/LaptopList";
import LaptopDetails from "./pages/LaptopDetails";
import './App.css'


function App() {

  return (
    <>
      <BrowserRouter>
        <GlobalProvider>
          <nav>
            <NavLink to='/'>Prodotti</NavLink>
          </nav>
          <Routes>
            <Route path='/' Component={LaptopList} />
            <Route path='/laptops/:id' Component={LaptopDetails} />

          </Routes>
        </GlobalProvider>
      </BrowserRouter>
    </>
  )
}

export default App
