import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AllCoins from "./AllCoins";
import "../styles/style.css";
import SingleCoinDetails from "./SingleCoinDetails";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <a className="site-logo" href="/">
          <h1>Crypto Tracker</h1>
        </a>
        <Routes>
          <Route path="/coin/:id" element={<SingleCoinDetails />} />
          <Route path="/" element={<AllCoins />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
