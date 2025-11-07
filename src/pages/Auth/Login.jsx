import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const Login = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Hardcoded credentials with roles
  const hardcodedUsers = {
    "admin@regalia.com": {
      password: "admin@123",
      role: "Admin",
      name: "Admin User",
      isActive: true,
    },
    "staff@regalia.com": {
      password: "staff@123",
      role: "Staff",
      name: "Staff User",
      isActive: true,
    },
    "manager@regalia.com": {
      password: "manager@123",
      role: "Admin",
      name: "Manager User",
      isActive: true,
    }
  };

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const login = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password!");
      return;
    }

    const user = hardcodedUsers[email.trim()];
    
    if (!user) {
      toast.error("User not found!");
      return;
    }

    if (user.password !== password.trim()) {
      console.log('Expected:', user.password);
      console.log('Received:', password.trim());
      toast.error("Incorrect password!");
      return;
    }

    if (!user.isActive) {
      toast.error("This account is inactive!");
      return;
    }

    // Store user data in localStorage
    localStorage.setItem("User", JSON.stringify(user));
    localStorage.setItem("currentUser", 'true');
    localStorage.setItem("role", user.role);

    toast.success(`Welcome ${user.name}!`);
    setCurrentUser(true);
    
    // Use setTimeout to allow toast to show before navigation
    setTimeout(() => {
      window.location.href = "/banquet/list-booking";
    }, 1000);
  };

  useEffect(() => {
    if (localStorage.getItem("currentUser") === 'true') {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Toaster />
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: 'hsl(45, 100%, 95%)'}}>
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2" style={{color: 'hsl(45, 100%, 20%)'}}>
                Regalia Hotel
              </h1>
              <p className="text-gray-600">Sign in to your account</p>
            </div>
            
            <form onSubmit={login} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c3ad6b] focus:border-[#c3ad6b] outline-none transition-colors"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c3ad6b] focus:border-[#c3ad6b] outline-none transition-colors"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-11 text-gray-500 hover:text-gray-700"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? <IoIosEyeOff size={20} /> : <IoIosEye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-[#c3ad6b] hover:bg-[#b39b5a] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                Sign In
              </button>
            </form>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Demo Credentials:</p>
              <div className="text-xs text-gray-500 space-y-1">
                <div>Admin: admin@regalia.com / admin@123</div>
                <div>Staff: staff@regalia.com / staff@123</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;