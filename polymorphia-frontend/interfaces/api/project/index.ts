export interface ProjectVariantResponseDTO {
  id: number;
  name: string;
  categoryName: string;
  shortCode: string;
  imageUrl: string;
}

export interface ProjectGroupConfigurationResponseDTO {
  studentIds: number[];
  selectedVariants: Record<number, number>; // maps categoryId to variantId
}
