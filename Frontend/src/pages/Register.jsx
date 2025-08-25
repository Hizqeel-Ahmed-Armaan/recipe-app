import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const {register} = useContext(AuthContext)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     await register(username, email, password);
     navigate('/')
   } catch (error) {
    console.log('Error in handleSubmit function', error)
   }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
       <div className='bg-gray-50 shadow-md border-none rounded-xl '>
        <form onSubmit={handleSubmit} className='flex flex-col justify-between items-center p-5' >

          <div className='font-bold text-2xl'><h1>Register</h1></div>
           
           <div className='flex flex-col justify-between items-center p-5'>
            <div className='mb-3'>
            <label className='block  text-gray-500' htmlFor="username">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className='w-max outline-none border rounded-md border-gray-500 p-1' placeholder='Enter your Username' name='username' />
          </div>

            <div  className='mb-3'>
            <label className='block text-gray-500' htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name='email' className='w-max outline-none border rounded-md border-gray-500 p-1' placeholder='Enter your email' />
          </div>

           <div  className='mb-3'>
            <label className='block  text-gray-500' htmlFor="Password">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className='w-max outline-none border rounded-md border-gray-500 p-1' placeholder='Enter your Password' name='Password' />
          </div>

            <button type='submit' className='mb-0 mt-2 border-none rounded-md bg-blue-500 px-3 py-2 hover:bg-blue-600 active:bg-blue-700 text-white font-bold'>Register</button>
          
           </div>
          
        </form>

       </div>
    </div>
  )
}

export default Register
