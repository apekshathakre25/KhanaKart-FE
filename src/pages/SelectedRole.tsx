import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppData } from '../context/AppContext';

type Role = 'customer' | 'rider' | 'seller' | null;

const SelectedRole = () => {
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const { setAuth, setUser } = useAppData();
  const navigate = useNavigate();

  const roles: Exclude<Role, null>[] = ['customer', 'rider', 'seller'];

  const updateRole = async () => {
    if (!selectedRole) {
      toast.error('Please select a role');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await axios.put(
        `${import.meta.env.VITE_API_AUTH_URL}/role`,
        { role: selectedRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUser(response.data.data);
      setAuth(true);

      toast.success('Role updated successfully');
      navigate('/');
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-center text-2xl font-bold">Select Role</h1>

        <div className="space-y-4">
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRole(r)}
              className={`w-full rounded-xl border px-4 py-3 text-sm font-medium capitalize transition 
                ${
                  selectedRole === r
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300'
                }`}
            >
              {r}
            </button>
          ))}
        </div>

        <button
          onClick={updateRole}
          className="w-full rounded-xl bg-black py-3 text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SelectedRole;
