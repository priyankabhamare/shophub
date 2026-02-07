export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export const categories = ['All', 'Bags', 'Accessories', 'Eyewear', 'Watches', 'Footwear'];

export const products: Product[] = [
  {
    id: 1,
    name: "Classic Canvas Tote",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=400&fit=crop",
    description: "Durable canvas tote bag perfect for everyday use. Spacious interior with reinforced handles.",
    category: "Bags"
  },
  {
    id: 2,
    name: "Premium Leather Wallet",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1546868871-7541df60d0d9?w=400&h=400&fit=crop",
    description: "Handcrafted leather wallet with multiple card slots. Made from genuine Italian leather.",
    category: "Accessories"
  },
  {
    id: 3,
    name: "Modern Sunglasses",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    description: "UV protection sunglasses with trendy frames. Perfect for any occasion.",
    category: "Eyewear"
  },
  {
    id: 4,
    name: "Minimalist Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop",
    description: "Elegant minimalist design with stainless steel case. Water resistant up to 50m.",
    category: "Watches"
  },
  {
    id: 5,
    name: "Silk Scarf",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1615562141207-5dda27babd4a?w=400&h=400&fit=crop",
    description: "Luxurious silk scarf with vibrant patterns. Perfect for adding elegance to any outfit.",
    category: "Accessories"
  },
  {
    id: 6,
    name: "Backpack Essentials",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    description: "Spacious backpack with multiple compartments and laptop pocket. Comfortable straps.",
    category: "Bags"
  },
  {
    id: 7,
    name: "Designer Crossbody",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    description: "Stylish crossbody bag made from premium materials. Perfect for travel and daily use.",
    category: "Bags"
  },
  {
    id: 8,
    name: "Premium Shoes",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    description: "Comfortable and stylish shoes with premium materials. Suitable for all seasons.",
    category: "Footwear"
  },
];
