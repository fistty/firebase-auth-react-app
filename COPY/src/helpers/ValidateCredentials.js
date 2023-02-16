export const validateEmail = async (email, signin) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  } else {
    if (signin) {
    }
    return false;
  }
};

export const validatePassword = async (password, signin) => {
  if (signin) {
    if (password.length <= 0) {
      return false;
    } else {
      return true;
    }
    return;
  }
  if (!signin) {
    if (/.{6,}/.test(password)) {
      return true;
    } else {
      return false;
    }
  }
};

const validateConfirmPassword = (password, confirmPassword) => {
  if (password === confirmPassword && password !== "") {
    return true;
  } else {
    return false;
  }
};

export const validateCredentials = async (
  email,
  password,
  confirmPassword,
  setEmailError,
  setPasswordError,
  setConfirmPasswordError
) => {
  return await Promise.all([
    validateEmail(email),
    validatePassword(password),
    validateConfirmPassword(password, confirmPassword),
  ])
    .then(res => {
      if (res[0] === false) {
        setEmailError("Enter a valid Email");
      }
      if (res[1] === false) {
        setPasswordError("Use at least 8 characters");
      }
      if (res[2] === false) {
        setConfirmPasswordError("Passwords don't match");
      }
      if (res.indexOf(false) !== -1) {
        throw new Error(
          `Array contains 'false' element at idx: ${res.indexOf(false)}`
        );
      }
    })
    .catch(error => {
      throw new Error(error);
    });
};
