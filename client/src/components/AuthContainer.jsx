import bg from '../assets/bg.jpeg';

const AuthContainer = ({ children }) => {
  return (
    <div className='w-screen min-h-screen lg:h-screen flex flex-col lg:flex-row' style={{backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className='fixed top-0 bg-black bg-opacity-50 h-screen w-screen'/>
      <div className='lg:w-1/2 w-full h-full flex items-center justify-center gap-10 p-10 font-bold z-10'>
        <div className='flex flex-col gap-4 items-center lg:items-start'>
          <h1 className='text-6xl sm:text-8xl roboto-black-italic drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]'>
            <span className='text-orange-500'>Hard</span>
            <span className='text-yellow-400'>Hat</span>
          </h1>
          <h1 className='text-2xl sm:text-4xl roboto-medium text-white text-center'>Any job. Anywhere. Anytime.</h1>
        </div>
      </div>
      <div className='lg:w-1/2 w-full h-full flex items-center justify-center p-10 z-10'>
        {children}
      </div>
    </div>
  );
};

export default AuthContainer;
