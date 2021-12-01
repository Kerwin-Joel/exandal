import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Fabricacion from "./components/Fabricacion";
import FormLimpieza from "./components/FormLimpieza";
import Nav from './components/Nav';

function App() {
  return (
    <BrowserRouter >
      <Nav/>
      <Routes>
        <Route path="/Limpieza" element={<FormLimpieza/>} />
        <Route path="/Fabricacion" element={<Fabricacion/>} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
