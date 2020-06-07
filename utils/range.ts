function range(start: number, end: number) {
  if (start > end) {
    throw new RangeError('end cannot be less than start');
  }

  return Array(end - start + 1)
    .fill(null)
    .map((_, idx) => start + idx);
}

export { range };
