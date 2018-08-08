export function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

// export function stringifyValue
export function stringify(value) {
  return '' + value;
}
