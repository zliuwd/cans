export function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

export function stringify(value) {
  return '' + value;
}
