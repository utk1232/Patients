import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const titleMap: { [key: string]: string } = {
  '/': 'Login - Qkonnect',
  '/register': 'Register - Qkonnect',
  '/dashboard': 'Dashboard - Qkonnect',
  '/patientsDetails': 'Patient Details - Qkonnect',
  '/clivinicDetail': 'Clinicians - Qkonnect',
};

export const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const title = titleMap[location.pathname] || 'Qkonnect';
    document.title = title;
  }, [location.pathname]);
};
