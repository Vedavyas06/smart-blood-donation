import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, MapPin, Clock, Shield, Award } from 'lucide-react';

const HomePage: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Registered Donors', value: '50,000+' },
    { icon: Heart, label: 'Lives Saved', value: '25,000+' },
    { icon: MapPin, label: 'Partner Hospitals', value: '500+' },
    { icon: Clock, label: 'Average Response', value: '< 2 hours' },
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'All donations follow strict medical protocols and safety standards.'
    },
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'Emergency blood requests are matched with donors in real-time.'
    },
    {
      icon: Award,
      title: 'Recognition',
      description: 'Donors receive certificates and recognition for their life-saving contributions.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Save Lives Through
                <span className="text-red-200"> Blood Donation</span>
              </h1>
              <p className="text-xl mb-8 text-red-100 leading-relaxed">
                Join our community of heroes who make a difference every day. 
                Your donation can save up to three lives and bring hope to families in need.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/donor/register"
                  className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-50 transition-colors text-center"
                >
                  Become a Donor
                </Link>
                <Link
                  to="/hospital/register"
                  className="bg-red-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-400 transition-colors text-center border-2 border-red-400"
                >
                  Hospital Registration
                </Link>
              </div>
            </div>
            
            <div className="lg:flex justify-center hidden">
              <img 
                src="https://images.pexels.com/photos/6823567/pexels-photo-6823567.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Blood donation process"
                className="rounded-lg shadow-2xl max-w-md w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awareness Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.pexels.com/photos/6823559/pexels-photo-6823559.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Medical professionals with blood donation"
                className="rounded-lg shadow-lg w-full object-cover"
              />
            </div>
            
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why Blood Donation Matters
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Every 2 seconds, someone in need requires blood. From accident victims 
                to patients undergoing surgery, cancer treatment, or managing chronic 
                conditions - your donation directly impacts lives in your community.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Blood cannot be manufactured - it can only come from generous donors like you. 
                With a simple 30-minute donation, you can make the difference between life and death.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="text-center p-4">
                    <benefit.icon className="w-8 h-8 text-red-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of heroes who have already made their mark. Your journey to saving lives starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/donor/login"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              Donor Login
            </Link>
            <Link
              to="/hospital/login"
              className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-400 transition-colors border-2 border-blue-400"
            >
              Hospital Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;