/**
 * Toggles item from array
 * @param array
 * @param value
 */
export function insertOrRemove<DataType>(array: Array<DataType>, value: DataType) {
  const index = array.findIndex(d => d === value);
  index === -1 ? array.push(value) : array.splice(index, 1);
  return array;
}