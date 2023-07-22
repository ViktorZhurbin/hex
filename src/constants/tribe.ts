const Tribes = {
  tribeOne: "tribeOne",
  tribeTwo: "tribeTwo",
} as const;

type TTribes = keyof typeof Tribes;

export type { TTribes };
export { Tribes };
