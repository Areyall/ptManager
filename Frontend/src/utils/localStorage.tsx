export const addUserToLocalStorage = (user: object) => {
  localStorage.setItem('pmManUser', JSON.stringify(user));
};
export const removeUserToLocalStorage = () => {
  localStorage.removeItem('pmManUser')
};
export const getUserToLocalStorage = () => {
  const result = localStorage.getItem('pmManUser')
  const user = result ? JSON.parse(result):null
  return user
};



