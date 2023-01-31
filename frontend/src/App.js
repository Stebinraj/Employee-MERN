import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AdminHome from './pages/Admin/AdminHome';
import UserHome from './pages/User/UserHome';
import Create from './pages/Admin/Create';
import Update from './pages/Admin/Update';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/admins' element={<AdminHome />}></Route>
            <Route path='/users' element={<UserHome />}></Route>
            <Route path='/create' element={<Create />}></Route>
            <Route path='/update' element={<Update />}></Route>
        </Routes>
    );
}

export default App;
