// components/withAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login'); // Redirect to login if token not found
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
