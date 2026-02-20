export function saveToStorage(data) {
  localStorage.setItem('transactions', JSON.stringify(data));
}

export function getFromStorage() {
  return JSON.parse(localStorage.getItem('transactions')) || [];
}
