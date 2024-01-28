import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
//---------- Pages----------//
//---------- Components----------//
//---------- Library----------//



import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


import Login from './Pages/Login'
import Register from './Pages/Register'
import Navbar from './Components/Navbar'
import Reset from './Pages/Reset'
import DataTable from './Components/TableList'
import AddUser from './Pages/AddUser'
import Details from './Pages/Detail'
import Edit from './Pages/EditUser'
function App() {

  return (
         
       <div className='mt-20'>
       <ToastContainer 
      autoClose={500}
     theme='dark'
     closeOnClick
     pauseOnHover={false}   
     />

        <Navbar/>
        <Routes>
        <Route path="/" element={<Login/>} ></Route>
        <Route path="/dataTable" element={<DataTable/>} ></Route>
        <Route path="/user/addUser" element={<AddUser/>} ></Route>
        <Route path="/user/details/:id" element={<Details/>} ></Route>
        <Route path="/user/edit/:id" element={<Edit/>} ></Route>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/register" element={<Register />} ></Route>
        <Route path="/reset" element={<Reset />} ></Route>

      </Routes>
       </div>
  )
}

export default App
