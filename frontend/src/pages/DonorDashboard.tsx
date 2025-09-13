import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Heart, Calendar, Phone, Mail, MapPin, LogOut, Activity } from 'lucide-react';

interface DonorData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  bloodGroup: string;
  age?: string;
  gender?: string;
  registeredAt: string;
  status: string;
}

const DonorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [donorData, setDonorData] = useState<DonorData | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    
    if (!isLoggedIn || userType !== 'donor') {
      navigate('/donor/login');
      return;
    }

    // Load donor data
    const storedDonorData = localStorage.getItem('donorData');
    if (storedDonorData) {
      setDonorData(JSON.parse(storedDonorData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    navigate('/');
  };

  if (!donorData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const registrationDate = new Date(donorData.registeredAt).toLocaleDateString();
  
  // Mock donation history and stats
  const donationHistory = [
    { date: '2024-01-15', location: 'City General Hospital', status: 'Completed' },
    { date: '2023-11-20', location: 'Community Blood Bank', status: 'Completed' },
    { date: '2023-09-10', location: 'Red Cross Center', status: 'Completed' }
  ];

  const nextEligibleDate = new Date();
  nextEligibleDate.setDate(nextEligibleDate.getDate() + 56); // 8 weeks from now

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Welcome back, {donorData.fullName}!
                </h1>
                <p className="text-gray-600">Thank you for being a life-saver</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <User className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Full Name</p>
                    <p className="text-gray-600">{donorData.fullName}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Heart className="w-5 h-5 text-red-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Blood Group</p>
                    <p className="text-gray-600 font-semibold">{donorData.bloodGroup}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">{donorData.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">{donorData.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 md:col-span-2">
                  <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Address</p>
                    <p className="text-gray-600">{donorData.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Member Since</p>
                    <p className="text-gray-600">{registrationDate}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Activity className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Status</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {donorData.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Donation History */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Donation History</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {donationHistory.map((donation, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(donation.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {donation.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {donation.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Donations</span>
                  <span className="font-bold text-red-600">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Lives Impacted</span>
                  <span className="font-bold text-green-600">9+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Donation</span>
                  <span className="text-sm text-gray-500">Jan 15, 2024</span>
                </div>
              </div>
            </div>

            {/* Next Eligibility */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Next Eligible Donation</h3>
              <div className="text-center">
                <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-blue-800 font-semibold">
                  {nextEligibleDate.toLocaleDateString()}
                </p>
                <p className="text-sm text-blue-600 mt-2">
                  Mark your calendar to help save more lives!
                </p>
              </div>
            </div>

            {/* Achievement Badge */}
            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
              <h3 className="text-lg font-bold text-yellow-900 mb-4">Achievement</h3>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-8 h-8 text-yellow-600" />
                </div>
                <p className="font-semibold text-yellow-800">Life Saver</p>
                <p className="text-sm text-yellow-600 mt-1">
                  You've made 3+ donations and helped save multiple lives!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;