import { Navbar, Welcome, Footer, Services, Transcations, Loader, WelcomeWrapper, Cryptocurrencies } from "./components";
import Home from './pages/Home';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

const App = () => {
  return (
    //  <div className="min-h-screen">
    //   <div className="gradient-bg-welcome">
    //     <Navbar />
    //     <Welcome />

    //   </div>
    //   <Services />
    //   <Transcations/>
    //   <Footer/>
    //  </div>
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <BrowserRouter >
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/welcome" element={<WelcomeWrapper />} />
            <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />


          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App

