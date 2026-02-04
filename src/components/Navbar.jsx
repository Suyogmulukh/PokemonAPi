
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between lg:px-24 items-center py-3 sm:py-5 px-4 sm:px-6 bg-(--c2) sticky top-0 z-30'>
        <Link to='/' className='font-medium text-lg sm:text-xl lg:text-2xl text-yellow-300'>Poki Info</Link>
        <div className='flex flex-wrap gap-2 sm:gap-4 items-center justify-center w-full sm:w-auto sm:mt-0'>
          <Link className='text-sm sm:text-base font-medium active:scale-95 bg-(--c4) text-(--c1) rounded px-3 sm:px-4 py-1.5 sm:py-2' to='/'>home</Link>
          <Link className='text-sm sm:text-base font-medium active:scale-95 bg-(--c4) text-(--c1) rounded px-3 sm:px-4 py-1.5 sm:py-2' to='/collection'>Collection</Link>
          <Link className='text-sm sm:text-base font-medium active:scale-95 bg-(--c4) text-(--c1) rounded px-3 sm:px-4 py-1.5 sm:py-2' to='/profile'>Profile</Link>
        </div>
      </div>
  )
}

export default Navbar