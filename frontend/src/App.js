import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import Content from './pages/Content'
import Modal from './components/Modal'
import CategoryProducts from './pages/CategoryProducts'
import NotFound from './pages/NotFound'
import Repairs from './pages/Repairs'
import Customers from './pages/Customers'
import Parts from './pages/Parts'

function App() {
  return (
    <>
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Dashboard />}>
            <Route path='' element={<Repairs />} />
            <Route path='customers' element={<Customers />} />
            <Route path='parts' element={<Parts />} />
            <Route path='form' element={<Modal />} />
            <Route path='category/:category' element={<CategoryProducts />} />
          </Route>
          <Route path='*' element={<NotFound />}/>
        </Routes>     
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
