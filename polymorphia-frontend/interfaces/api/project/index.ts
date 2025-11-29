export interface ProjectVariantResponseDTO {
  id: number;
  name: string;
  categoryName: string;
  shortCode: string;
  imageUrl: string;
}

export interface ProjectGroupConfigurationResponseDTO {
  animalIds: number[];
  selectedVariants: Record<number, number>; // maps categoryId to variantId
}
