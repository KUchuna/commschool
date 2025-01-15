import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";
import NotFound from "../pages/NotFound";


export default function Routing() {
  return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}