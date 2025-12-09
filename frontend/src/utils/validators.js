export const isValidUnifeiEmail = (email) => {
  return email && email.endsWith('@unifei.edu.br');
};

export const isValidPassword = (password) => {
  return password && password.length >= 6;
};