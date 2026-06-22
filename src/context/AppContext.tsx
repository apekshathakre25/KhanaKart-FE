import axios from 'axios';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { User, AppContextType, Location } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState<Location | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [city, setCity] = useState('Fetching Location...');

  const fetchUser = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setUser(null);
      setAuth(false);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_AUTH_URL}/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUser(response.data.user);
      setAuth(true);
    } catch (error) {
      console.error('Failed to fetch user:', error);

      localStorage.removeItem('token');
      setUser(null);
      setAuth(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      setCity('Location Not Supported');
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const { data } = await axios.get(
            'https://nominatim.openstreetmap.org/reverse',
            {
              params: {
                format: 'json',
                lat: latitude,
                lon: longitude,
              },
            },
          );

          setLocation({
            latitude,
            longitude,
            formatedAddress: data.display_name || 'Current Location',
          });

          setCity(
            data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              data.address?.county ||
              'Your Location',
          );
        } catch (error) {
          console.error('Failed to fetch address:', error);

          setLocation({
            latitude,
            longitude,
            formatedAddress: 'Current Location',
          });

          setCity('Failed To Load');
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);

        setCity('Location Access Denied');
        setLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }, []);

  return (
    <AppContext.Provider
      value={{
        auth,
        loading,
        setAuth,
        setLoading,
        setUser,
        user,
        location,
        loadingLocation,
        city,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppData = (): AppContextType => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppData must be used within AuthProvider');
  }

  return context;
};