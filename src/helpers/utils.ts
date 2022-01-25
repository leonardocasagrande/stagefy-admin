import { getIn } from 'formik';

const getErrorByKey = (key: string, touched: any, errors: any) => {
  const touch = getIn(touched, key);
  if (!touch) return null;
  const err = getIn(errors, key);
  if (!err) return null;
  return err;
};

export { getErrorByKey };
