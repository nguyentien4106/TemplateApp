import { BrowserRouter, Routes, Route, RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Home from './pages/home/page';
import Authentication from './pages/authentication/page'
import DashBoard from './pages/dashboard/page'
import router from './routes';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <>
      <RouterProvider router={createBrowserRouter(router)} />
      <Toaster />
    </>
  );
}

export default App;
