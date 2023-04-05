import { Route, Routes } from "react-router-dom";
import CardDetails from "../Pages/CardDetails";
import { HomePage } from "../Pages/HomePage";
import NotFound from "../Pages/NotFound";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:id" element={<CardDetails />} />
      <Route path="/episodes/:id" element={<CardDetails />} />
      <Route path="/location/:id" element={<CardDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
