import { Suspense } from "react";
import Bottles from "./components/Bottles";

const fetchBottlesPromise = async () => {
  const res = await fetch("bottles.json");
  return res.json();
};

function App() {
  const bottlesPromise = fetchBottlesPromise();
  return (
    <div className="grid place-content-center min-h-screen px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 container mx-auto">
      <Suspense fallback={<h2 className="text-2xl font-bold">Loading...</h2>}>
        <Bottles bottlesPromise={bottlesPromise}></Bottles>
      </Suspense>
    </div>
  );
}

export default App;
