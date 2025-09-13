import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, LogOut, Heart, Clock, CheckCircle, AlertCircle, Search, User, Filter } from 'lucide-react';

interface HospitalData {
  id: string;
  hospitalName: string;
  email: string;
  phone: string;
  address: string;
  registeredAt: string;
  status: string;
  verificationStatus: string;
}

interface BloodRequest {
  id: string;
  bloodGroup: string;
  quantity: number;
  urgency: string;
  patientName: string;
  contactPerson: string;
  contactPhone: string;
  requestedAt: string;
  status: string;
}

interface Donor {
  id: string;
  fullName: string;
  age: number;
  gender: string;
  bloodGroup: string;
  email: string;
  phone: string;
  address: string;
  lastDonation: string;
  totalDonations: number;
  availability: 'Available' | 'Not Available' | 'Recently Donated';
  distance: string;
}

const HospitalDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [hospitalData, setHospitalData] = useState<HospitalData | null>(null);
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([]);
  const [activeTab, setActiveTab] = useState<'search' | 'request' | 'history'>('search');
  const [searchFilters, setSearchFilters] = useState({
    bloodGroup: '',
    location: '',
    availability: ''
  });
  const [newRequest, setNewRequest] = useState({
    bloodGroup: '',
    quantity: '',
    urgency: 'Normal',
    patientName: '',
    contactPerson: '',
    contactPhone: ''
  });

  // Example donor data
  const [donors] = useState<Donor[]>([
    {
      id: '1',
      fullName: 'John Smith',
      age: 28,
      gender: 'Male',
      bloodGroup: 'O+',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, Downtown, City',
      lastDonation: '2024-01-15',
      totalDonations: 8,
      availability: 'Available',
      distance: '2.3 km'
    },
    {
      id: '2',
      fullName: 'Sarah Johnson',
      age: 32,
      gender: 'Female',
      bloodGroup: 'A+',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 234-5678',
      address: '456 Oak Ave, Midtown, City',
      lastDonation: '2023-12-20',
      totalDonations: 12,
      availability: 'Available',
      distance: '1.8 km'
    },
    {
      id: '3',
      fullName: 'Michael Brown',
      age: 35,
      gender: 'Male',
      bloodGroup: 'B+',
      email: 'michael.brown@email.com',
      phone: '+1 (555) 345-6789',
      address: '789 Pine Rd, Uptown, City',
      lastDonation: '2024-02-28',
      totalDonations: 6,
      availability: 'Recently Donated',
      distance: '3.1 km'
    },
    {
      id: '4',
      fullName: 'Emily Davis',
      age: 26,
      gender: 'Female',
      bloodGroup: 'AB+',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 456-7890',
      address: '321 Elm St, Westside, City',
      lastDonation: '2024-01-08',
      totalDonations: 4,
      availability: 'Available',
      distance: '4.2 km'
    },
    {
      id: '5',
      fullName: 'David Wilson',
      age: 41,
      gender: 'Male',
      bloodGroup: 'O-',
      email: 'david.wilson@email.com',
      phone: '+1 (555) 567-8901',
      address: '654 Maple Dr, Eastside, City',
      lastDonation: '2023-11-30',
      totalDonations: 15,
      availability: 'Available',
      distance: '2.7 km'
    },
    {
      id: '6',
      fullName: 'Lisa Anderson',
      age: 29,
      gender: 'Female',
      bloodGroup: 'A-',
      email: 'lisa.anderson@email.com',
      phone: '+1 (555) 678-9012',
      address: '987 Cedar Ln, Southside, City',
      lastDonation: '2024-02-10',
      totalDonations: 7,
      availability: 'Available',
      distance: '3.5 km'
    },
    {
      id: '7',
      fullName: 'Robert Taylor',
      age: 38,
      gender: 'Male',
      bloodGroup: 'B-',
      email: 'robert.taylor@email.com',
      phone: '+1 (555) 789-0123',
      address: '147 Birch St, Central, City',
      lastDonation: '2024-03-01',
      totalDonations: 9,
      availability: 'Recently Donated',
      distance: '1.2 km'
    },
    {
      id: '8',
      fullName: 'Jennifer Martinez',
      age: 33,
      gender: 'Female',
      bloodGroup: 'AB-',
      email: 'jennifer.martinez@email.com',
      phone: '+1 (555) 890-1234',
      address: '258 Spruce Ave, Northside, City',
      lastDonation: '2023-12-15',
      totalDonations: 11,
      availability: 'Available',
      distance: '2.9 km'
    }
  ]);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const urgencyLevels = ['Low', 'Normal', 'High', 'Critical'];
  const availabilityOptions = ['Available', 'Not Available', 'Recently Donated'];

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    
    if (!isLoggedIn || userType !== 'hospital') {
      navigate('/hospital/login');
      return;
    }

    // Load hospital data
    const storedHospitalData = localStorage.getItem('hospitalData');
    if (storedHospitalData) {
      setHospitalData(JSON.parse(storedHospitalData));
    }

    // Load existing blood requests
    const storedRequests = localStorage.getItem('bloodRequests');
    if (storedRequests) {
      setBloodRequests(JSON.parse(storedRequests));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    navigate('/');
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newRequest.bloodGroup || !newRequest.quantity || !newRequest.patientName || 
        !newRequest.contactPerson || !newRequest.contactPhone) {
      alert('Please fill in all required fields');
      return;
    }

    const request: BloodRequest = {
      id: Date.now().toString(),
      ...newRequest,
      quantity: parseInt(newRequest.quantity),
      requestedAt: new Date().toISOString(),
      status: 'Pending'
    };

    const updatedRequests = [request, ...bloodRequests];
    setBloodRequests(updatedRequests);
    localStorage.setItem('bloodRequests', JSON.stringify(updatedRequests));

    // Reset form
    setNewRequest({
      bloodGroup: '',
      quantity: '',
      urgency: 'Normal',
      patientName: '',
      contactPerson: '',
      contactPhone: ''
    });

    alert('Blood request submitted successfully!');
  };

  const handleContactDonor = (donor: Donor) => {
    if (donor.availability === 'Recently Donated') {
      alert(`${donor.fullName} has recently donated and may not be eligible yet. Last donation: ${new Date(donor.lastDonation).toLocaleDateString()}`);
      return;
    }
    
    const message = `Hello ${donor.fullName}, we have an urgent need for ${searchFilters.bloodGroup || 'blood'} donation at ${hospitalData?.hospitalName}. Please contact us at ${hospitalData?.phone} if you're available to help save a life.`;
    
    // Simulate sending message
    alert(`Contact request sent to ${donor.fullName}!\n\nMessage: ${message}`);
  };

  const filteredDonors = donors.filter(donor => {
    const matchesBloodGroup = !searchFilters.bloodGroup || donor.bloodGroup === searchFilters.bloodGroup;
    const matchesLocation = !searchFilters.location || donor.address.toLowerCase().includes(searchFilters.location.toLowerCase());
    const matchesAvailability = !searchFilters.availability || donor.availability === searchFilters.availability;
    
    return matchesBloodGroup && matchesLocation && matchesAvailability;
  });

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Recently Donated': return 'bg-yellow-100 text-yellow-800';
      case 'Not Available': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Normal': return 'bg-blue-100 text-blue-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!hospitalData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const registrationDate = new Date(hospitalData.registeredAt).toLocaleDateString();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {hospitalData.hospitalName}
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    hospitalData.verificationStatus === 'verified' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {hospitalData.verificationStatus === 'verified' ? (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Pending Verification
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('search')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'search'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Search className="w-4 h-4 inline mr-2" />
                Search Donors
              </button>
              <button
                onClick={() => setActiveTab('request')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'request'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Heart className="w-4 h-4 inline mr-2" />
                Request Blood
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'history'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Clock className="w-4 h-4 inline mr-2" />
                Request History
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Search Donors Tab */}
            {activeTab === 'search' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Find Blood Donors</h2>
                  
                  {/* Search Filters */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Filter className="w-4 h-4 inline mr-1" />
                          Blood Group
                        </label>
                        <select
                          value={searchFilters.bloodGroup}
                          onChange={(e) => setSearchFilters(prev => ({ ...prev, bloodGroup: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">All Blood Groups</option>
                          {bloodGroups.map(group => (
                            <option key={group} value={group}>{group}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <MapPin className="w-4 h-4 inline mr-1" />
                          Location
                        </label>
                        <input
                          type="text"
                          value={searchFilters.location}
                          onChange={(e) => setSearchFilters(prev => ({ ...prev, location: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="Search by area..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Availability
                        </label>
                        <select
                          value={searchFilters.availability}
                          onChange={(e) => setSearchFilters(prev => ({ ...prev, availability: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">All Donors</option>
                          {availabilityOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Donors List */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredDonors.map((donor) => (
                      <div key={donor.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                              <User className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{donor.fullName}</h3>
                              <p className="text-sm text-gray-600">{donor.age} years, {donor.gender}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-red-600">{donor.bloodGroup}</span>
                            <p className="text-xs text-gray-500">{donor.distance} away</p>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-4 h-4 mr-2" />
                            {donor.phone}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="w-4 h-4 mr-2" />
                            {donor.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            {donor.address}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm">
                            <span className="text-gray-600">Total Donations: </span>
                            <span className="font-semibold text-green-600">{donor.totalDonations}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-600">Last Donation: </span>
                            <span className="font-semibold">{new Date(donor.lastDonation).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAvailabilityColor(donor.availability)}`}>
                            {donor.availability}
                          </span>
                          <button
                            onClick={() => handleContactDonor(donor)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                              donor.availability === 'Available'
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                            disabled={donor.availability !== 'Available'}
                          >
                            Contact Donor
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredDonors.length === 0 && (
                    <div className="text-center py-8">
                      <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No donors found matching your criteria</p>
                      <p className="text-sm text-gray-400 mt-1">Try adjusting your search filters</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Request Blood Tab */}
            {activeTab === 'request' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Request Blood</h2>
                
                <form onSubmit={handleRequestSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Blood Group *
                      </label>
                      <select
                        value={newRequest.bloodGroup}
                        onChange={(e) => setNewRequest(prev => ({ ...prev, bloodGroup: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Select Blood Group</option>
                        {bloodGroups.map(group => (
                          <option key={group} value={group}>{group}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity (Units) *
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={newRequest.quantity}
                        onChange={(e) => setNewRequest(prev => ({ ...prev, quantity: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Number of units"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Urgency Level
                    </label>
                    <select
                      value={newRequest.urgency}
                      onChange={(e) => setNewRequest(prev => ({ ...prev, urgency: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {urgencyLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Patient Name *
                    </label>
                    <input
                      type="text"
                      value={newRequest.patientName}
                      onChange={(e) => setNewRequest(prev => ({ ...prev, patientName: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Patient full name"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        value={newRequest.contactPerson}
                        onChange={(e) => setNewRequest(prev => ({ ...prev, contactPerson: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Doctor or staff name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Phone *
                      </label>
                      <input
                        type="tel"
                        value={newRequest.contactPhone}
                        onChange={(e) => setNewRequest(prev => ({ ...prev, contactPhone: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Submit Blood Request
                  </button>
                </form>
              </div>
            )}

            {/* Request History Tab */}
            {activeTab === 'history' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Request History</h2>
                
                {bloodRequests.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Blood Group
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Patient
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Urgency
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {bloodRequests.map((request) => (
                          <tr key={request.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(request.requestedAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                              {request.bloodGroup}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {request.quantity} units
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {request.patientName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                                {request.urgency}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                {request.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No blood requests yet</p>
                    <p className="text-sm text-gray-400 mt-1">Your submitted requests will appear here</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats Sidebar */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Hospital Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600">Hospital</p>
              <p className="font-semibold text-gray-900">{hospitalData.hospitalName}</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-sm text-gray-600">Total Requests</p>
              <p className="font-semibold text-green-600">{bloodRequests.length}</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="font-semibold text-yellow-600">
                {bloodRequests.filter(req => req.status === 'Pending').length}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Search className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-sm text-gray-600">Available Donors</p>
              <p className="font-semibold text-red-600">
                {donors.filter(donor => donor.availability === 'Available').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;