enum ProductCategory {
  TOOLS = 'TOOLS',
  MATERIALS = 'MATERIALS',
  ELECTRONICS = 'ELECTRONICS',
  PLUMBING = 'PLUMBING',
  PAINTING = 'PAINTING',
  GARDENING = 'GARDENING',
  OTHER = 'OTHER',
}

interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: ProductCategory;
}

export { Product, ProductCategory };