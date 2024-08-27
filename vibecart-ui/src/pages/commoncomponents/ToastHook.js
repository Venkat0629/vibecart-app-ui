import { useState, useCallback } from 'react';

const useToast = () => {
  const [toast, setToast] = useState({ type: '', message: '' });
  const [showToast, setShowToast] = useState(false);

  const triggerToast = useCallback((type, message) => {
    setToast({ type, message });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  }, []);

  return { toast, showToast, triggerToast };
};

export default useToast;
