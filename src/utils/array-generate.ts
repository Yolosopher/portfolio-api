const arrayGenerate = (length: number): number[] =>
  Array.from({ length: length }, (v, i) => i + 1);

export default arrayGenerate;
