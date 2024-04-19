import { Navbar, Welcome, Footer, Services, Transcations, Loader, WelcomeWrapper, Cryptocurrencies, CryptoDetails, News } from "./components";
import Exchanges from "./components/Exchanges";
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
            <Route path="/crypto/:coinId" element={<CryptoDetails />} />
            <Route path="/exchanges" element={<Exchanges />} />
            <Route path="/news" element={<News />} />




          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App

