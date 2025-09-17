import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Heart, LogOut, CheckCircle, AlertCircle, Clock } from 'lucide-react';

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
  requestedAt: string;
  status: string;
}

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const HospitalDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [hospitalData, setHospitalData] = useState<HospitalData | null>(null);
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([]);
  const [requestForm, setRequestForm] = useState({
    bloodGroup: '',
    quantity: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    if (!isLoggedIn || userType !== 'hospital') {
      navigate('/hospital/login');
      return;
    }
    const storedHospitalData = localStorage.getItem('hospitalData');
    if (storedHospitalData) setHospitalData(JSON.parse(storedHospitalData));
    const storedRequests = localStorage.getItem('bloodRequests');
    if (storedRequests) setBloodRequests(JSON.parse(storedRequests));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    navigate('/');
  };

  const handleRequestChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRequestForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestForm.bloodGroup || !requestForm.quantity) {
      alert('Please select blood group and quantity');
      return;
    }
    // setLoading(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem("hospitalToken");
      const response = await fetch(`${backendUrl}/requests/donors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`  
        },
        body: JSON.stringify({
          bloodGroup: requestForm.bloodGroup,
          quantity: Number(requestForm.quantity),
        }),
      });
      // console.log(response);
      if (response.ok) {
        const request: BloodRequest = {
          id: Date.now().toString(),
          bloodGroup: requestForm.bloodGroup,
          quantity: Number(requestForm.quantity),
          requestedAt: new Date().toISOString(),
          status: 'Pending'
        };
        const updatedRequests = [request, ...bloodRequests];
        setBloodRequests(updatedRequests);
        localStorage.setItem('bloodRequests', JSON.stringify(updatedRequests));
        setRequestForm({ bloodGroup: '', quantity: '' });
        alert('Blood request submitted successfully!');
      } else {
        alert('Failed to submit blood request.');
      }
    } catch (error){
      console.log(error);
    }
    setLoading(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{hospitalData.hospitalName}</h1>
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
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors mt-4 sm:mt-0"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>

        {/* Request Blood Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 flex flex-col items-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Heart className="w-6 h-6 text-red-500 mr-2" />
            Request Blood
          </h2>
          <form onSubmit={handleRequestSubmit} className="w-full max-w-md grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group *</label>
              <select
                name="bloodGroup"
                value={requestForm.bloodGroup}
                onChange={handleRequestChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (Units) *</label>
              <input
                type="number"
                min="1"
                name="quantity"
                value={requestForm.quantity}
                onChange={handleRequestChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Number of units"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-red-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-red-700 transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                {loading ? 'Submitting...' : 'Submit Blood Request'}
              </button>
            </div>
          </form>
        </div>

        {/* Request History */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Clock className="w-5 h-5 text-yellow-500 mr-2" />
            Blood Request History
          </h2>
          {bloodRequests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          request.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : request.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
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
      </div>
    </div>
  );
};

export default HospitalDashboard;
