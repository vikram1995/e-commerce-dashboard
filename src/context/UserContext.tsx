"use client"
import urlConfig from '@/config/urlConfig';
import axios from 'axios';
import { createContext, useContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// Define the User type
interface User {
    id: string;
    email: string;
    // Add more user fields as needed
}

// Define the context type
interface UserContextType {
    user: User | null;
    loading: boolean;
    setUser: Dispatch<SetStateAction<User | null>>;
}

// Create the UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(urlConfig.auth.loggedInStatus, {
                    withCredentials: true, // Important to include cookies in the request
                });
                setUser(response.data);
            } catch (error) {
                setUser(null); // User is not authenticated
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);


    return (
        <UserContext.Provider value={{ user, loading, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
