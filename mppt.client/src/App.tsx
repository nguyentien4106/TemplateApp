import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import router from './routes';
import { Toaster } from './components/ui/toaster';
import { LoadingProvider } from './contexts/loading-providers'

function App() {
  return (
    <LoadingProvider>
      <RouterProvider router={createBrowserRouter(router)} />
      <Toaster />
    </LoadingProvider>
  );
}

export default App;
