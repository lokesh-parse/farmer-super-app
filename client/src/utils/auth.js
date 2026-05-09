export function saveUser(user) {
  localStorage.setItem("farmerUser", JSON.stringify(user));
}

export function getUser() {
  const user = localStorage.getItem("farmerUser");
  return user ? JSON.parse(user) : null;
}

export function removeUser() {
  localStorage.removeItem("farmerUser");
}

export function isAuthenticated() {
  return !!getUser();
}