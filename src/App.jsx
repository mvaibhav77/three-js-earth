import { Suspense } from "react";
import LoadingScreen from "./components/LoadingScreen";
import EarthScene from "./components/EarthScene";

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <EarthScene />
    </Suspense>
  );
}

export default App;
