export default function dateToIso() {
  return function(input) {
    input = new Date(input).toISOString();
    return input;
  };
}
