
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  UserCredential,
} from 'firebase/auth';
import { auth, profileCollection } from '../firebase';
import { Text } from 'react-native';

// 1. Define the type for the context's state and functions
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string,username:string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

// 2. Create the context with an initial undefined value
const AuthContext = createContext<AuthContextType|undefined>(undefined)

// 3. Custom hook to use the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// 4. AuthProvider Component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Authentication functions
  const signup = (email: string, password: string,username:string) => {
    async function register() {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response)
      return response;
    }
    return register()


  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  // State change observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // Context value object
  const value: AuthContextType = {
    currentUser,
    loading,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading && <Text>Loading ...</Text>}
      {!loading&&children}
    </AuthContext.Provider>
  );
};