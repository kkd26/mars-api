export default function calculateSol(sol?: number, maxSol: number = 0) {
  const day = sol || Math.floor(Math.random() * (maxSol + 1));

  return Math.max(Math.min(maxSol, day), 0);
}
