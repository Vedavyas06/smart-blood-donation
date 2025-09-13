import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-600" />
              <span className="font-bold text-xl text-gray-800">BloodConnect</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-red-600 bg-red-50' 
                  : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              Home
            </Link>
            
            {/* Donor Links */}
            <div className="relative group">
              <span className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 cursor-pointer hover:text-red-600">
                Donor
              </span>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  to="/donor/register"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                >
                  Register as Donor
                </Link>
                <Link
                  to="/donor/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                >
                  Donor Login
                </Link>
              </div>
            </div>

            {/* Hospital Links */}
            <div className="relative group">
              <span className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 cursor-pointer hover:text-red-600">
                Hospital
              </span>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  to="/hospital/register"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                >
                  Register Hospital
                </Link>
                <Link
                  to="/hospital/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                >
                  Hospital Login
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-50"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') 
                  ? 'text-red-600 bg-red-50' 
                  : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/donor/register"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Register as Donor
            </Link>
            <Link
              to="/donor/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Donor Login
            </Link>
            <Link
              to="/hospital/register"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Register Hospital
            </Link>
            <Link
              to="/hospital/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Hospital Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;