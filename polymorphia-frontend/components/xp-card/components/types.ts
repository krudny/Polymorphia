export interface XPCardPointsProps {
  points: string | undefined;
  isSumLabelVisible?: boolean;
  isXPLabelVisible?: boolean;
  hasChest?: boolean;
  color?: string;
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

export interface XPCardAssignProps {
  currentAssigned: number;
  maxAssigned: number;
  increment: () => void;
  decrement: () => void;
}
