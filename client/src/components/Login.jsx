import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../utils/auth';
import hardhat from '../assets/hard-hat.png';
import bg from '../assets/bg.jpeg';
import { Link } from 'react-router-dom';

const Login = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { user, token } = await loginUser({
        variables: { ...userFormData }
      });
      console.log(user);
      Auth.login(token);
    } catch(err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <div className='w-screen h-screen flex'  style={{backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className='w-1/2 h-full flex items-center justify-center p-10 bg-black bg-opacity-50'>
      </div>

      <div className='w-1/2 h-full flex items-center justify-center p-10 bg-black bg-opacity-50'>
        <Form className='w-[500px] p-10 border-black rounded-lg bg-orange-500 flex flex-col items-center gap-4 font-bold' noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
            Something went wrong with your login credentials!
          </Alert>
          <img src={hardhat} alt='hard hat' className='w-40 h-40' />
          <Form.Group>
            <Form.Label htmlFor='email'>Email</Form.Label>
            <Form.Control
              type='text'
              name='email'
              onChange={handleInputChange}
              value={userFormData.email}
              required
              className='w-[300px]'
            />
            <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              onChange={handleInputChange}
              value={userFormData.password}
              required
              className='w-[300px]'
            />
            <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
          </Form.Group>
          <Button
            disabled={!(userFormData.email && userFormData.password)}
            type='submit'
            className='font-bold bg-black border-none'
            >
            Log In
          </Button>
          <h1>Don't have an account? <Link className='text-blue-500' to={'/register'}>Register</Link> now!</h1>
        </Form>       
      </div>
    </div>
  );
};

export default Login;
