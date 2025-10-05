import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [message, setMessage] = useState("")
    const { loginUser, signInWithGoogle} = useAuth();
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

      const onSubmit = async (data) => {
        try {
            await loginUser(data.email, data.password);
            alert("Login successful!");
            navigate("/")
        } catch (error) {
            setMessage("Please provide a valid email and password") 
            console.error(error)
        }
      }

      const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            alert("Login successful!");
            navigate("/")
        } catch (error) {
            alert("Google sign in failed!") 
            console.error(error)
        }
      }
  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center '>
        <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-semibold mb-4'>Please Login</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
                    <input 
                    {...register("email", { required: true })} 
                    type="email" name="email" id="email" placeholder='Email Address'
                    className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
                    <input 
                    {...register("password", { required: true })} 
                    type="password" name="password" id="password" placeholder='Password'
                    className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                    />
                </div>
                {
                    message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
                }
                <div>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'>Login </button>
                </div>
            </form>
            <p className='align-baseline font-medium mt-4 text-sm'>Haven't an account? Please <Link to="/register" className='text-blue-500 hover:text-blue-700'>Register</Link></p>

            {/* google sign in */}
            <div className='mt-4'>
                <button 
                onClick={handleGoogleSignIn}
                className='w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none'>
                <FaGoogle  className='mr-2'/>
                Sign in with Google
                </button>
            </div>

            <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Book Store. All rights reserved.</p>
        </div>
    </div>
  )
}

// import React, { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import axios from 'axios'
// import getBaseUrl from '../utils/baseURL'
// import { useNavigate } from 'react-router-dom'

// const Login = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm()
//   const [message, setMessage] = useState('')
//   const navigate = useNavigate()

//   const onSubmit = async (data) => {
//     try {
//       const res = await axios.post(`${getBaseUrl()}/api/auth/login`, data)
//       const user = res.data

//       if (user.token) {
//         localStorage.setItem('userToken', user.token)
//         alert('Login successful!')
//         navigate('/')
//       }
//     } catch (err) {
//       setMessage('Invalid email or password')
//     }
//   }

//   return (
//     <div className="h-screen flex justify-center items-center bg-gray-100">
//       <div className="w-full max-w-sm bg-white p-8 rounded shadow">
//         <h2 className="text-xl font-bold mb-6 text-center">User Login</h2>

//         <form onSubmit={handleSubmit(onSubmit)}>

//           <div className="mb-4">
//             <label className="block mb-1">Email</label>
//             <input {...register('email', { required: true })}
//               type="email"
//               className="w-full border px-3 py-2 rounded"
//               placeholder="you@example.com"
//             />
//             {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1">Password</label>
//             <input {...register('password', { required: true })}
//               type="password"
//               className="w-full border px-3 py-2 rounded"
//               placeholder="********"
//             />
//             {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
//           </div>

//           {message && <p className="text-red-500 text-sm mb-2">{message}</p>}

//           <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Login




// export default Login
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/login', form);
//       const token = res.data.token;
//       localStorage.setItem('token', token);
//       alert('Login successful!');
//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Login
//         </button>
//       </form>
//       <p className="mt-4 text-center">
//         Don't have an account?{' '}
//         <a href="/register" className="text-blue-600 hover:underline">
//           Register
//         </a>
//       </p>
//     </div>
//   );
// };

export default Login;




