const LANGUAGE_KEY = "farmerLanguage";

export function getLanguage() {
  return localStorage.getItem(LANGUAGE_KEY) || "English";
}

export function saveLanguage(language) {
  localStorage.setItem(LANGUAGE_KEY, language);
}