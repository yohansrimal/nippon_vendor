import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "../components/Navigation/NavigationBar";
import Home from "../pages/Home";
import Create from "../pages/Create";

function Layout({ children }) {
  return (
    <div>
      <div
        style={{ paddingLeft: "2rem", paddingRight: "2rem", marginTop: "2rem" }}
      >
        {children}
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="create" element={<Create />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
