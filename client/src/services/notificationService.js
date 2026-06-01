export async function getNotifications() {
  const res = await fetch("http://localhost:5000/api/notifications");
  return res.json();
}