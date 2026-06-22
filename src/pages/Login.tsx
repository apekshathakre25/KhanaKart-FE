import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { useAppData } from '../context/AppContext';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { setAuth, setUser } = useAppData();
  const navigate = useNavigate();

  const googleResponse = async (authResult: any) => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_AUTH_URL}/login`,
        {
          code: authResult.code,
        },
      );

      localStorage.setItem('token', response.data.token);
      setUser(response.data.data);
      setAuth(true);
      toast.success(response.data.message || 'Login successful');
      navigate('/');
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Problem while login');
    } finally {
      setLoading(false);
    }
  };

  const login = useGoogleLogin({
    flow: 'auth-code',
    scope: 'openid email profile',
    onSuccess: (authResult) => {
      googleResponse(authResult);
    },
    onError: () => {
      toast.error('Google login failed');
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-100 via-white to-pink-100 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white/80 backdrop-blur-lg shadow-xl p-8 space-y-6 text-center border border-gray-100">
        <h1 className="text-4xl font-extrabold text-[#e23774] tracking-tight">
          KhanaKart 🍽️
        </h1>

        <p className="text-gray-500 text-sm">
          स्वाद से जुड़िए — Sign in to continue
        </p>

        <button
          onClick={() => login()}
          disabled={loading}
          className="flex items-center justify-center gap-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-700 font-medium shadow-sm hover:shadow-md hover:bg-gray-50 transition duration-200 disabled:opacity-50"
        >
          <FcGoogle size={22} />
          {loading ? 'Signing in...' : 'Continue with Google'}
        </button>

        <p className="text-xs text-gray-400">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;
