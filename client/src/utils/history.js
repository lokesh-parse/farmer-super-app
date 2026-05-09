const HISTORY_KEY = "farmerHistory";

export function getHistory() {
  const data = localStorage.getItem(HISTORY_KEY);
  return data ? JSON.parse(data) : [];
}

export function addHistoryItem(item) {
  const existingHistory = getHistory();

  const newItem = {
    id: Date.now().toString(),
    ...item,
  };

  const updatedHistory = [newItem, ...existingHistory];
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}