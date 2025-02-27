import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThList, faTachometerAlt, faCube, faServer, faTasks, faLock, faCog, faSignOutAlt, faLightbulb, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useTheme } from '../Context/ThemeContext'; 
import { rolesPermissions } from './Login';
import logo from '../assets/RealPage_logo.png'; // Adjust the path as necessary

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { isDarkTheme, toggleTheme } = useTheme(); 

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsSidebarOpen]);

  return (
    <>
      <div className='bg-white'>
        <button
          onClick={toggleSidebar}
          className={`fixed top-4 left-4 z-50 p-3 rounded-full transition-all duration-100
            ${isDarkTheme ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-delftBlue text-white hover:bg-gray-200'}`}
          aria-label="Toggle Sidebar"
        >
          <FontAwesomeIcon icon={faThList} />
        </button>
      </div>
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-100
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} border-r 
          ${isDarkTheme ? 'bg-black border-gray-700' : 'bg-white border-gray-300'} 
          md:w-64 w-56`}
        aria-label="Sidebar"
      >
        <div className={`h-full px-3 py-4 overflow-y-auto bg-delftBlue ${isDarkTheme ? 'text-white' : 'text-white'}`}>
          <h1 className={`text-2xl font-semibold tracking-wide mt-2 ml-12 mb-6 ${isDarkTheme ? 'text-white' : 'text-white'}`}>
            SwarmOps
          </h1>
          
          <ul className="space-y-2 font-medium">
            {[
              { name: 'Home', icon: faTachometerAlt, link: '/' },
              { name: 'Services', icon: faCube, link: '/services' },
              { name: 'Nodes', icon: faServer, link: '/nodes' },
              { name: 'Logout', icon: faSignOutAlt, link: '/logout' },
              { name: 'Add User', icon: faUserPlus, link: '/adduser' } ,
            ].map(({ name, icon, link }) => (
              <li key={name}>
                <Link
                  to={link}
                  className={`flex items-center p-2 rounded-lg transition-colors duration-100 
                    ${isDarkTheme ? 'hover:bg-gray-700 hover:text-white' : 'hover:bg-gray-200 hover:text-black'}`}
                >
                  <FontAwesomeIcon
                    icon={icon}
                    className={`w-5 h-5 p-1 rounded transition duration-100 
                      ${isDarkTheme ? 'text-gray-400' : ' text-white'}`}
                  />
                  <span className={`${isDarkTheme ? 'text-gray-400' : ' text-white'} ms-3 ${isSidebarOpen ? 'block' : 'hidden'}`}>{name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* <div className="absolute bottom-4 left-3">
          <button
            onClick={toggleTheme}
            className={` p-3 rounded-full transition-colors duration-100 
              ${isDarkTheme ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
          >
            <FontAwesomeIcon icon={faLightbulb} className="w-5 h-5" />
          </button>
        </div> */}
        <div className="absolute bottom-2 ">
          <div className="flex items-center justify-center ">
            <img src={logo} alt="RealPage Logo" className="tracking-wide mt-2  ml-5 mb-6 h-6 w-full" />
          </div>
        </div>
        
      </aside>
    </>
  );
};

export default Navbar;