const KEY = "farmerNotifications";

export function getNotifications() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function saveNotifications(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function addNotification(notification) {
  const existing = getNotifications();
  const updated = [notification, ...existing];
  saveNotifications(updated);
}

export function removeNotification(id) {
  const existing = getNotifications();
  const updated = existing.filter((n) => n.id !== id);
  saveNotifications(updated);
}