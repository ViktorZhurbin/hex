import "./App.css";
import { HexGrid } from "./components/HexGrid/HexGrid";
import { Tribes } from "./constants/tribe";

function App() {
  return <HexGrid tribes={[Tribes.tribeOne, Tribes.tribeTwo]} />;
}

export default App;
