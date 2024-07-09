import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhonenumber] = useState('');
  const [address, setAddress] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password,address,phoneNumber,username);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl font-bold mb-6 text-center">Sign Up</h3>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Username:</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Email address:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Phone Number:</label>
          <input
            type="text"
            onChange={(e) => setPhonenumber(e.target.value)}
            value={phoneNumber}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Address:</label>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
          />
        </div>


        <button
          type="submit"
          disabled={isLoading}
          className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold"
        >
          Sign up
        </button>
        <Link to='/login'><div className="mt-4 p-2 text-white rounded">Already have an account</div></Link>
        {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}
      </form>
    </div>
  );
}

export default Signup;
