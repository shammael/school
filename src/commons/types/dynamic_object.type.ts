export type DynamicObject<Key> = {
  [K in keyof Key]: unknown;
};
