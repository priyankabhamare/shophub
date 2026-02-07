# ShopHub E-Commerce App - Code Explanation

## Overview
ShopHub is a simple e-commerce shopping application built with Next.js. Users can browse products, add items to their cart, and manage their shopping cart. The app uses **Context API** for state management and **localStorage** for data persistence.

---

## Project Structure

```
/app
  ├── page.tsx              # Home page - hero section with features
  ├── layout.tsx            # Root layout with providers
  ├── CartContext.tsx       # Cart state management
  ├── globals.css           # Global styles with theme colors
  ├── /products
  │   └── page.tsx          # Products page - browse & filter products
  └── /cart
      └── page.tsx          # Cart page - view & manage cart

/components
  ├── Navbar.tsx            # Navigation bar with cart badge
  └── Footer.tsx            # Footer with links

/lib
  └── products.ts           # Product data & types
```

---

## Key Files Explained

### 1. **CartContext.tsx** - State Management
This file creates a **React Context** to manage the shopping cart globally across the entire app.

```typescript
// Creates a Context to share cart data with all components
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider wraps the app and provides cart functions
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Load cart from localStorage when app starts
  useEffect(() => {
    const savedCart = localStorage.getItem('ecommerce_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ecommerce_cart', JSON.stringify(cart));
  }, [cart]);
```

**Key Functions:**
- `addToCart(product)` - Adds a product or increases quantity if already in cart
- `removeFromCart(productId)` - Removes an item from cart
- `updateQuantity(productId, quantity)` - Changes item quantity
- `clearCart()` - Empties the entire cart
- `total` - Calculates the sum of all items (price × quantity)
- `itemCount` - Total number of items in cart

**Hook to use anywhere:**
```typescript
const { cart, addToCart, removeFromCart, updateQuantity, total, itemCount } = useCart();
```

---

### 2. **layout.tsx** - Root Layout
Wraps the entire app with the CartProvider so all pages can access the cart.

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>      {/* Provides cart to all pages */}
          <Navbar />        {/* Navigation at top */}
          {children}        {/* Page content */}
          <Footer />        {/* Footer at bottom */}
        </CartProvider>
      </body>
    </html>
  );
}
```

---

### 3. **Navbar.tsx** - Navigation Component
Shows the ShopHub logo, navigation links, and a cart badge with item count.

```typescript
function NavbarComponent() {
  const { itemCount } = useCart();  // Gets cart count
  const [isOpen, setIsOpen] = useState(false);  // Mobile menu toggle

  return (
    <nav className="sticky top-0">
      <Logo />
      <DesktopMenu>
        <Link href="/products">Shop</Link>
        <Link href="/cart">
          Cart
          {itemCount > 0 && <Badge>{itemCount}</Badge>}
        </Link>
      </DesktopMenu>
      <MobileMenu isOpen={isOpen} />
    </nav>
  );
}
```

**Features:**
- Sticky navbar stays at top when scrolling
- Cart badge shows number of items in cart
- Responsive: Desktop menu hides on mobile, shows hamburger button
- Mobile menu toggles with animated hamburger icon

---

### 4. **Products Page** (/app/products/page.tsx)
Displays all products with filtering by category and "Add to Cart" buttons.

```typescript
export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart();

  // Filter products by selected category
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div>
      {/* Category buttons for filtering */}
      {categories.map((cat) => (
        <button onClick={() => setSelectedCategory(cat)}>
          {cat}
        </button>
      ))}

      {/* Products grid */}
      {filteredProducts.map((product) => (
        <div key={product.id}>
          <img src={product.image} />
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
```

**Functionality:**
- Click category buttons to filter products
- Each product shows image, name, price, and rating
- "Add to Cart" button triggers `addToCart()` function
- Products are displayed in a responsive grid (1 column on mobile, 4 on desktop)

---

### 5. **Cart Page** (/app/cart/page.tsx)
Shows cart items, allows quantity adjustment and item removal, displays order total.

```typescript
export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();

  return (
    <div>
      {/* Show empty cart message if no items */}
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {/* List cart items */}
          {cart.map((item) => (
            <div key={item.product.id}>
              <img src={item.product.image} />
              <h3>{item.product.name}</h3>
              <p>${item.product.price}</p>
              
              {/* Quantity controls */}
              <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>−</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
              
              {/* Remove button */}
              <button onClick={() => removeFromCart(item.product.id)}>Remove</button>
            </div>
          ))}

          {/* Order summary */}
          <div>
            <p>Total: ${total.toFixed(2)}</p>
            <button>Proceed to Checkout</button>
            <button onClick={() => clearCart()}>Clear Cart</button>
          </div>
        </>
      )}
    </div>
  );
}
```

**Features:**
- Shows message if cart is empty
- Each cart item shows image, name, price
- Quantity buttons (+/-) to adjust item amounts
- Remove button deletes individual items
- Order summary with total price
- Clear Cart button empties entire cart

---

### 6. **products.ts** - Product Data
Defines the Product interface and contains mock product data.

```typescript
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
    name: 'Premium Leather Bag',
    price: 49.99,
    image: 'https://...',
    description: 'High-quality leather bag',
    category: 'Bags'
  },
  // ... more products
];
```

---

## Data Flow

```
User clicks "Add to Cart"
        ↓
Calls addToCart(product) from useCart hook
        ↓
CartContext updates cart state
        ↓
useEffect saves to localStorage
        ↓
CartProvider re-renders with new data
        ↓
Navbar shows updated itemCount
        ↓
Cart page displays updated items
```

---

## How State Persists

1. **Adding items:** Items are added to `cart` state in CartContext
2. **Auto-save:** `useEffect` hook watches `cart` and saves to `localStorage` automatically
3. **On page reload:** `useEffect` on component mount loads cart from `localStorage`
4. **Result:** Cart items persist even after closing/reopening browser

---

## Styling

All styling uses **Tailwind CSS** with these gradients:

```
Primary gradient: from-purple-600 via-pink-600 to-orange-500
Background gradient: from-purple-50 via-white to-pink-50
```

---

## Component Tree

```
RootLayout
├── CartProvider (provides cart context)
│   ├── Navbar (shows cart count)
│   ├── Page Component (home/products/cart)
│   └── Footer
```

---

## To Add a Feature

### Example: Add "Save for Later"
1. Add `savedItems: SavedItem[]` to CartContext state
2. Create `saveForLater(product)` function
3. Create "Save" button in products page
4. Create "Saved Items" page to show saved products
5. Allow moving saved items back to cart

### Example: Add Product Search
1. Add `searchTerm` state in Products page
2. Filter products by name: `products.filter(p => p.name.includes(searchTerm))`
3. Add search input field
4. Display results in real-time as user types

---

## Summary

**ShopHub is built on these principles:**
- ✅ **Context API** for global state (cart)
- ✅ **localStorage** for data persistence
- ✅ **React Hooks** (useState, useEffect, useContext)
- ✅ **Next.js** for pages and routing
- ✅ **Tailwind CSS** for styling
- ✅ **Responsive Design** (mobile-first approach)
