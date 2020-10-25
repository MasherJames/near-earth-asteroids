// NonwhiteSpace@NonwhiteSpace.NonwhiteSpace
const validEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

// Atleast one capital, lowercase, number and not less than 8 characters
const validPassword = (password) => {
  return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password);
};

export { validEmail, validPassword };
