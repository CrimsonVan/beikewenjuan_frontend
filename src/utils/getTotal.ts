export const getTotal = (t: number) => {
  if (t <= 6) {
    return 10
  }
  return t % 6 === 0 ? 10 * Math.floor(t / 6) : 10 * Math.floor(1 + t / 6)
}
