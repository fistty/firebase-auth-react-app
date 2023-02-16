export const formatError = str => {
  if (str === "auth/internal-error") {
    return "Wrong Password";
  }
  const newString = str
    .replace("auth/", "")
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return newString;
};
