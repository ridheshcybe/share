import names from "./names.json";

export function run() {
  return names[Math.floor(Math.random() * names.length)];
}

export default run;
