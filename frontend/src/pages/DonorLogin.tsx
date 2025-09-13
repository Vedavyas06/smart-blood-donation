import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';

const DonorLogin: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Check if donor data exists (simulating authentication)
      const donorData = localStorage.getItem('donorData');
      
      if (donorData) {
        const donor = JSON.parse(donorData);
        if (donor.email === formData.email) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userType', 'donor');
          alert('Login successful!');
          navigate('/donor/dashboard');
        } else {
          setErrors({ email: 'Invalid email or password' });
        }
      } else {
        // For demo purposes, allow any valid email/password combination
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userType', 'donor');
        // Create demo donor data
        const demoDonor = {
          id: Date.now().toString(),
          fullName: 'Demo Donor',
          email: formData.email,
          bloodGroup: 'O+',
          phone: '+1 (555) 123-4567',
          address: '123 Main St, City, State',
          registeredAt: new Date().toISOString(),
          status: 'active'
        };
        localStorage.setItem('donorData', JSON.stringify(demoDonor));
        alert('Login successful!');
        navigate('/donor/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <User className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Donor Login</h2>
            <p className="text-gray-600 mt-2">Access your donor dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Login to Dashboard
            </button>
          </form>

          {/* Links */}
          <div className="text-center mt-6 space-y-2">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/donor/register" className="text-red-600 hover:text-red-700 font-semibold">
                Register here
              </Link>
            </p>
            <p className="text-sm text-gray-500">
              <a href="#" className="hover:text-red-600">Forgot Password?</a>
            </p>
          </div>

          {/* Demo Notice */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Demo Mode:</strong> Use any valid email and password (min 6 characters) to login.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorLogin;