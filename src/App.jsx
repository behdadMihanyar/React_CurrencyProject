import Gold from "./Pages/Gold";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Currency from "./Pages/Currency";
import Crypto from "./Pages/Crypto";
import Coin from "./Pages/Coin";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Gold />} />
      <Route path="/currency" element={<Currency />} />
      <Route path="/cryptoPrice" element={<Crypto />} />
      <Route path="/coin/:id" element={<Coin />} />
    </Route>
  )
);
const App = () => {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;
