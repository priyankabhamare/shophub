'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products, Product } from '@/lib/products';
import { ChevronLeft, ShoppingCart } from 'lucide-react';

interface CartItem extends Product {
  quantity: number;
}

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addedToCart, setAddedToCart] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const productId = parseInt(params.id as string);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar cartCount={0} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Product not found
            </h1>
            <Link
              href="/products"
              className="text-primary hover:underline"
            >
              Back to Products
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = () => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar cartCount={cartCount} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-primary hover:text-primary/80 transition mb-8"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <div className="relative h-96 md:h-full min-h-96 bg-secondary rounded-lg overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            {/* Category */}
            <div className="mb-4">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {product.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Additional Details */}
            <div className="space-y-4 mb-8">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Features:</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Premium quality materials</li>
                  <li>• Designed for durability</li>
                  <li>• Modern aesthetic appeal</li>
                  <li>• Perfect for everyday use</li>
                </ul>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6 flex items-center space-x-4">
              <div>
                <label className="text-sm font-semibold text-foreground">
                  Quantity:
                </label>
              </div>
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="px-4 py-2 text-foreground hover:bg-secondary transition"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-12 text-center border-l border-r border-border bg-background text-foreground"
                  min="1"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="px-4 py-2 text-foreground hover:bg-secondary transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="bg-primary text-primary-foreground py-4 rounded-lg font-semibold hover:bg-primary/90 transition flex items-center justify-center space-x-2 mb-4"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>

            {/* Success Message */}
            {addedToCart && (
              <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg">
                ✓ Added to cart successfully!
              </div>
            )}

            {/* Continue Shopping */}
            <Link
              href="/products"
              className="text-center text-primary hover:underline mt-4"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-20 pt-12 border-t border-border">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter((p) => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                  <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition group cursor-pointer">
                    <div className="relative h-40 bg-secondary overflow-hidden">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground line-clamp-1">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-primary font-bold mt-2">
                        ${relatedProduct.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
