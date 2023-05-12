import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import AddFoodItem from './pages/AddFoodItem';
import Cart from './pages/Cart';
import EditFoodItem from './pages/EditFoodItem';
import EditItemForm from './components/editItemForm';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addFoodItem" element={<AddFoodItem />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/editFoodItem" element={<EditFoodItem />} />
        <Route path="/editItemForm" element={<EditItemForm />} />
      </Routes>
    </>
  )
}

export default App
