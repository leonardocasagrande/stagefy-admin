const isPhoneValid = (phone: string) => {
  return (phone.match(/\d/g) || []).length === 11;
};

export { isPhoneValid };
