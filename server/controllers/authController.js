import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendWelcomeEmail, sendVerificationEmail, sendPasswordResetEmail, sendResetSuccessEmail } from '../mailtrap/emails.js';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }
    const userAlreadyExists = await User.findOne({email})
    if (userAlreadyExists) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword, 
      verificationToken,
      verificationTokenExpiration: Date.now() + 3600000
    })
    await user.save();
    const id = user._id
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' }); 

    res.cookie('token', token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 604800000
    });

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      message: 'User created successfully.',
      user: {
        ...user._doc,
        password: null
      }
    }) 
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.error(error)
  }
} 

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordValid) {
      return res  .status(400).json({ message: 'Invalid credentials.' });
    }
    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      message: 'Logged in successfully.',
      user: {
        ...user._doc,
        password: null
      }
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.error(error)
  }
}
 
export const logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully.' });  
}

export const verifyEmail = async (req, res) => {
  const {code} = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiration: { $gt: Date.now() }
    })

    if (!user) {
      return res.status(400).json({ message: 'Invalid verification code.' });
    }
    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiration = null;
    await user.save();
    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({ 
      message: 'Email verified successfully.',
      user: {
        ...user._doc,
        password: null
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.error(error)
  }
}

export const resetPassword = async (req, res) => {
  try {
    const {token} = req.params;
    const {password} = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetTokenExpiration: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetTokenExpiration = null;
   
    await user.save();
 
    await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

    res.status(200).json({ message: 'Password reset successful.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.error(error)
  }
}

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    res.status(200).json({
      message: 'Authentication successful.',
      user: {
        ...user._doc,
        password: null
      }
    });
  } catch (error) {
    console.error(error);
		res.status(400).json({ message: error.message });
  }
}

