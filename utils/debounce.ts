export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...funcArgs: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => func(...args), wait)
  }
}
