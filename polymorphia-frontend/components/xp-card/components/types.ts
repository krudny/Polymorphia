export interface XPCardPointsProps {
  points: string;
  isSumLabelVisible?: boolean;
  isXPLabelVisible?: boolean;
  hasChest?: boolean;
}

export interface XPCardUngradedProps {
  ungraded: number;
}

export interface XPCardProjectVariantProps {
  shortCode: string;
}

export interface XPCardImageProps {
  imageUrl: string;
  alt: string;
}

export interface XPCardDoubleImageProps {
  images: singleImage[];
}

interface singleImage {
  imageUrl: string;
  alt: string;
}
