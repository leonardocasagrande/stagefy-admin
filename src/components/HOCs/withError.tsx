import SwalAlert from 'components/alerts';
import { useApp } from 'hooks/AppContext';
import { useEffect } from 'react';

const withError = (Component: React.ComponentType) => ({ ...props }) => {
  const { errorMessage, setErrorMessage } = useApp();
  useEffect(() => {
    if (errorMessage) {
      SwalAlert.fire({
        icon: 'error',
        title: 'Ops!',
        html: errorMessage,
        confirmButtonText: 'Ok, obrigada',
        customClass: {
          confirmButton: 'error',
        },
      }).then(() => setErrorMessage(null));
    }
  }, [errorMessage, setErrorMessage]);
  return <Component {...props} />;
};

export default withError;
