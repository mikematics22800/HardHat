import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';
import { useState } from 'react';

const Input = ({ icon: Icon, ...props }) => {
  const [visible, setVisible] = useState(false); 
	return (
		<div className='relative mb-6'>
			<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
				<Icon className='size-5 text-yellow-400' />
			</div>
      <div className='flex w-full items-center justify-between pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 text-white placeholder-gray-400 transition duration-200'>
        <input
          {...props}
          type={visible ? 'text' : props.type}
          className='w-full bg-transparent focus:outline-none'
        />
        {props.type === 'password' && (
          <IconButton
            onClick={() => setVisible(!visible)}
            className='!text-yellow-400 p-0'
          >
            {visible === false && <VisibilityIcon />}
            {visible === true && <VisibilityOffIcon />}
          </IconButton>
        )}
      </div>
		</div>
	);
};

export default Input;