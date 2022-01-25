import SwalAlert from 'components/alerts';
import { useApp } from 'hooks/AppContext';
import { useEffect } from 'react';

const withSuccess = (Component: React.ComponentType) => ({ ...props }) => {
  const { successMessage, setSuccessMessage } = useApp();
  useEffect(() => {
    if (successMessage) {
      SwalAlert.fire({
        icon: 'success',
        title: 'Ação bem sucedida!',
        html: successMessage,
        confirmButtonText: 'Ok, obrigada',
        customClass: {
          confirmButton: 'success',
        },
      }).then(() => setSuccessMessage(null));
    }
  }, [successMessage, setSuccessMessage]);
  return <Component {...props} />;
};

export default withSuccess;
