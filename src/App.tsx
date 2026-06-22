import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import SelectedRole from './pages/SelectedRole';
import Navbar from './components/Navbar';
import Account from './pages/Account';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/select-role" element={<SelectedRole />} />
          <Route path="/account" element={<Account />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>

      <Toaster />
    </BrowserRouter>
  );
};

export default App;
