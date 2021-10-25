import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVine } from '@fortawesome/free-brands-svg-icons';

const Navbar: React.FC = () => (
    <nav className="flex items-center justify-between flex-wrap bg-gray-700 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <Link to="/" className="font-semibold text-xl tracking-tight"><FontAwesomeIcon icon={faVine} size="lg" /></Link>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
                <Link to="/creators" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white">Creators</Link>
                <Link to="/upload" className="block mt-4 ml-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white">Upload</Link>
            </div>
        </div>
    </nav>
);

export default Navbar;
