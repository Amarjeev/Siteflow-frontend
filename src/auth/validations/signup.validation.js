export const validateSignup = ({
  username,
  email,
  password,
  rePassword,
}) => {
  const errors = {};

  if (!username) {
    errors.username = "Username is required";
  } else if (username.length < 3 || username.length > 30) {
    errors.username = "Username must be 3–30 characters";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 50) {
    errors.email = "Invalid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6 || password.length > 10) {
    errors.password = "Password must be 6–10 characters";
  }

  if (!rePassword) {
    errors.rePassword = "Confirm password is required";
  } else if (password !== rePassword) {
    errors.rePassword = "Passwords do not match";
  }

  return errors;
};
