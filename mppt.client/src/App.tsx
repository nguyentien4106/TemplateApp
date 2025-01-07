import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Home from './pages/home/page';
import Login from './pages/login/page'
import DashBoard from './pages/dashboard/page'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />

        <Route path="/" element={<AppLayout />}>
          <Route path='/dashboard' element={<DashBoard />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
