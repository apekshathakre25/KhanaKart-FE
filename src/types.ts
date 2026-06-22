export interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  role: string | null;
}

export interface Location {
  latitude: number;
  longitude: number;
  formatedAddress: string;
}

export interface AppContextType {
  user: User | null;
  loading: boolean;
  auth: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  location : Location | null;
  loadingLocation : boolean;
  city : string
}
