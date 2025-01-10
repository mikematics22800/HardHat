import { useState } from 'react';
import Input from "../components/Input";
import hardhat from '../assets/hard-hat.png';
import { Link } from 'react-router-dom';
import { Mail, Lock, Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, isLoading, error } = useAuthStore();

	const handleLogin = async (e) => {
		e.preventDefault();
		await login(email, password);
	};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
      <div className='p-8'>
        <img src={hardhat} alt='hardhat' className='w-32 h-32 mx-auto mb-4' />
        <form onSubmit={handleLogin}>
          <Input
            icon={Mail}
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            icon={Lock}
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className='flex items-center mb-6'>
            <Link to='/forgot-password' className='text-sm text-yellow-400 hover:underline font-bold'>
              Forgot password?
            </Link>
          </div>
          {error && <p className='text-red-500 font-semibold mb-2'>Invalid email or password.</p>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='w-full py-3 px-4 bg-gradient-to-r from-yellow-400 to-orange-600 text-white font-bold rounded-lg shadow-lg hover:from-yellow-600 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? <Loader className='w-6 h-6 animate-spin  mx-auto' /> : "Login"}
          </motion.button>
        </form>
      </div>
      <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
        <p className='text-sm text-gray-400'>
          Don't have an account?{" "}
          <Link to='/register' className='text-yellow-400 hover:underline font-bold'>
            Register!
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
