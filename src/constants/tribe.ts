export const Tribes = {
  tribeOne: "tribeOne",
  tribeTwo: "tribeTwo",
} as const;

export type TTribe = keyof typeof Tribes;
