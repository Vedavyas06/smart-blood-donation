import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DonorRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    gender: "",
    bloodGroup: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy registration: just navigate to dashboard
    navigate("/donor/dashboard", { state: { donor: form } });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-red-700">Donor Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Full Name" className="w-full p-2 border rounded" />
        <input name="age" value={form.age} onChange={handleChange} required placeholder="Age" type="number" className="w-full p-2 border rounded" />
        <select name="gender" value={form.gender} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Blood Group</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>
        </select>
        <input name="email" value={form.email} onChange={handleChange} required placeholder="Email" type="email" className="w-full p-2 border rounded" />
        <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone Number" className="w-full p-2 border rounded" />
        <input name="address" value={form.address} onChange={handleChange} required placeholder="Address" className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Register</button>
      </form>
    </div>
  );
}

export default DonorRegister;