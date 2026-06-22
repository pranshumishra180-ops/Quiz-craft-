import { BrowserRouter, Routes, Route }
from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import QuizList from "./pages/QuizList";
import QuizPage from "./pages/QuizPage";
import Leaderboard from "./pages/Leaderboard";
import ResultPage from "./pages/ResultPage";
import UploadPdf from "./pages/UploadPdf";
import Dashboard from "./pages/Dashboard";
import MyResults from "./pages/MyResult";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageUsers from "./pages/ManageUsers";
import AdminRoute from "./components/AdminRoute";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/login"element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route  path="/quiz" element={  <ProtectedRoute>  <QuizList /> </ProtectedRoute>   } />

        <Route
          path="/quiz/:id"
          element={<ProtectedRoute> <QuizPage /></ProtectedRoute> } />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <ResultPage />
            </ProtectedRoute>
          }
        />

        <Route path="/upload" element={<UploadPdf />}/>

<Route path="/dashboard" element={<Dashboard />}/> 

<Route
  path="/my-results"
  element={<MyResults />}
/>



<Route
  path="/manage-users"
  element={<ManageUsers />}
/>

<Route
  path="/manage-users"
  element={
    <AdminRoute>
      <ManageUsers />
    </AdminRoute>
  }
/>


 </Routes>




    </BrowserRouter>
  );
}

export default App;