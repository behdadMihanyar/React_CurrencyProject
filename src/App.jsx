import Gold from "./Pages/Gold";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Currency from "./Pages/Currency";
<<<<<<< HEAD
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Crypto from "./Pages/Crypto";
import Coin from "./Pages/Coin";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
const query = new QueryClient();
=======
import Crypto from "./Pages/Crypto";
import Coin from "./Pages/Coin";
>>>>>>> 7ba0bb728f6f5aab3f351024860235b6306ca466
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
<<<<<<< HEAD
  useEffect(() => {
    toast("خوش آمدید", {
      position: "top-center",
      className: "toast-message",
    });
  }, []);
  return (
    <div>
      <QueryClientProvider client={query}>
        <RouterProvider router={router}></RouterProvider>
        <ReactQueryDevtools />
        <ToastContainer />
      </QueryClientProvider>
=======
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
>>>>>>> 7ba0bb728f6f5aab3f351024860235b6306ca466
    </div>
  );
};

export default App;
