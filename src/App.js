import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Music from "./components/music/Music";
import Pnf from "./components/layouts/Pnf";
import Track from "./components/music/artist/track/Track";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={`/`} element={<Music />} />
        <Route path={`/music`} element={<Music />} />
        <Route path={`/track/:artistId`} element={<Track />} />
        <Route path={`/*`} element={<Pnf />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
