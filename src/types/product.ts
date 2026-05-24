export interface Product {
  product_id: number
  product_name: string
  description: string
  image_url: string
  shop_id: number
  category_id: number
  price: number
  tax_type: 'I' | 'E' | 'N'
  rating: number
  review_count: number
  stock: number
  status: 'O' | 'S' | 'D'
  created_at: number
}
