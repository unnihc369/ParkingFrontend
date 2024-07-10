import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate,Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Login = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  if (user) {
    navigate("/parkinglot");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form className="bg-gray-800 p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h3 className="text-2xl font-semibold mb-6">Log In</h3>

        <label className="block mb-2">Email address:</label>
        <input
          type="email"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label className="block mb-2">Password:</label>
        <input
          type="password"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button
          className={`w-full py-2 mt-4 rounded ${isLoading ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Log in'}
        </button>

        <Link to="/signup">
          <div className="mt-4 p-2 text-white rounded">Don't have an account</div>
        </Link>
        {error && <div className="mt-4 p-2 bg-red-600 text-white rounded">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
