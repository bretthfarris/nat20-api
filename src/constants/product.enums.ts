// Product Type Enum
export const ProductType = {
  CARD: 'Card',
  SEALED: 'Sealed',
} as const;
export type ProductType = keyof typeof ProductType;

// Variant Type Enum
export const VariantType = {
  REGULAR: 'Regular',
  FOIL: 'Foil',
  BORDERLESS: 'Borderless',
  SHOWCASE: 'Showcase',
  SERIALIZED: 'Serialized',
  GALAXY_FOIL: 'Galaxy Foil',
} as const;
export type VariantType = keyof typeof VariantType;

// Condition Enum
export const Condition = {
  GRADED: 'Graded',
  NEAR_MINT: 'Near Mint',
  LIGHTLY_PLAYED: 'Lightly Played',
  MODERATELY_PLAYED: 'Moderately Played',
  HEAVILY_PLAYED: 'Heavily Played',
  DAMAGED: 'Damaged',
} as const;
export type Condition = keyof typeof Condition;