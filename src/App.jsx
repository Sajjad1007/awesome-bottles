import { Suspense } from "react";
import Bottles from "./components/Bottles";

const fetchBottlesPromise = async (link) => {
  const res = await fetch(link);
  return res.json();
};

function App() {
  const bottlesPromise = fetchBottlesPromise("bottles.json");
  return (
    <div className="grid place-content-center min-h-screen px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 container mx-auto">
      <Suspense fallback={<h2 className="text-3xl font-bold">Loading...</h2>}>
        <Bottles bottlesPromise={bottlesPromise}></Bottles>
      </Suspense>
    </div>
  );
}

export default App;
