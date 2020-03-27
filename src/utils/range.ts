function range(start: number, end: number) {
  return Array(end - start + 1)
    .fill(null)
    .map((_, idx) => start + idx);
}

export { range };
