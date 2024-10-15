"use client"
import { useUser } from '../context/UserContext';
import { redirect, useRouter } from 'next/navigation'
import { useEffect, ComponentType } from 'react';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const WithAuthComponent: React.FC<P> = (props) => {
        const { user, loading } = useUser();
        const router = useRouter()
        useEffect(() => {
            if (!loading && !user) {
                // Redirect to login if not authenticated
                redirect('/login'); // Change this to your login route
            }
        }, [user, loading, router]);

        if (loading) return <div>Loading...</div>; // Show loading state

        return <WrappedComponent {...(props as P)} />;
    };

    return WithAuthComponent;
};

export default withAuth;
