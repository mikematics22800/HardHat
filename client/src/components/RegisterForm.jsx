import Input from "../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordMeter from "../components/PasswordMeter";
import { useAuthStore } from "../store/authStore";
import hardhat from '../assets/hard-hat.png';
import { motion } from "framer-motion";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const { register, error, isLoading } = useAuthStore();

	const handleRegister = async (e) => {
		e.preventDefault();
    console.log(email, password, name);

		try {
			await register(email, password, name).then((res) => {
        console.log(res);
      });
			navigate("/verify-email");
		} catch (error) {
			console.log(error);
		}
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
        <form onSubmit={handleRegister}>
          <Input
            icon={User}
            type='text'
            placeholder='Full Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
          <PasswordMeter password={password} />
          <motion.button
            className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-yellow-400 to-orange-600 text-white 
            font-bold rounded-lg shadow-lg hover:from-yellow-600
            hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2
            focus:ring-offset-gray-900 transition duration-200'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? <Loader className='animate-spin mx-auto' size={24} /> : "Register"}
          </motion.button>
        </form>
      </div>
      <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
        <p className='text-sm text-gray-400'>
          Already have an account?{" "}
          <Link to={"/login"} className='text-yellow-400 hover:underline font-bold'>
            Log In!
          </Link>
        </p>
      </div>
    </motion.div>
	);
};
export default Register;


