import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const {user,logout} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
   logout();
   navigate("/login")
  }

  return <nav>
    <div className='flex justify-between p-4 bg-gray-300 shadow-md'>
       <Link to="/" ><div className='font-bold text-xl '>Recipes</div></Link> 
       {user ? (
        <div>
          <Link to='/add-recipe'>
          <button className='mx-1 px-3 py-1 border-none rounded-md bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold'>Add Recipe</button>
          </Link>
          <button className='px-3 py-1 border-none rounded-md bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold' onClick={handleLogout}>Logout</button>
        </div>
       ):(
         <div className='flex justify-between gap-2'>
           <Link  to="/login"> <button>Login</button></Link>
           <Link to="/register"> <button>Register</button></Link>
        </div>
       )}
    </div>
  </nav>
}

export default Navbar
