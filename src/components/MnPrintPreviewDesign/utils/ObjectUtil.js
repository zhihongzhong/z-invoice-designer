

export function copyObj(object) {
  return JSON.parse(
    JSON.stringify(object)
  );
}