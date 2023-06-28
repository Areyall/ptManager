import Landing from './pages/Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Error from './pages/Error';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="intro" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
