import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";

// Dashboard
import Home from "./pages/Dashboard/Home";

// Auth
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";

// Exams
// @ts-ignore: module has no types (JS file), treat as any
import ExamsPage from "./pages/Exams/ExamsPage";
// @ts-ignore: module has no types (JS file), treat as any
import ExamDetail from "./pages/Exams/ExamDetail";

// 404
import NotFound from "./pages/OtherPage/NotFound";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>

        {/* Dashboard */}
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Home />} />

          {/* Exams */}
          <Route path="/exams" element={<ExamsPage />} />
          <Route path="/exam/:id" element={<ExamDetail />} />
        </Route>

        {/* Auth */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
