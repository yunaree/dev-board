export function validateTitle(title: string): string | null {
  // робимо малі букви та обрізаємо зайві пробіли
  const normalized = title.trim().toLowerCase()

  // перевірка на кількість слів
  const words = normalized.split(/\s+/)
  if (words.length > 1) {
    return "Title can`t be more than one word"
  }

  if (!/^[a-z\s]+$/.test(normalized)) {
    return "Title must contain only Latin characters"
  }

  // перевірка на довжину (від 3 до 10 символів)
  if (normalized.replace(/\s+/g, "").length < 3 || normalized.replace(/\s+/g, "").length > 10) {
    return "Title must be between 3 and 10 letters (no spaces)"
  }

  return null 
}
