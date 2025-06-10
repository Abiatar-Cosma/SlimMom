// utils/calculations.js
export function calculateCalories({ height, age, weight, bloodType }) {
  const result = 10 * weight + 6.25 * height - 5 * age - 161;
  return Math.round(result);
}
