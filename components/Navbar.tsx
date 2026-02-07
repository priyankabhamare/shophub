'use client'; // This tells Next.js that this component runs on the client (browser).

import { useCart } from '@/app/CartContext'; // Imports a custom hook from CartContext.// Used to get cart data like itemCount.
import Link from 'next/link'; //Enables client-side routing (no full page reload).
import { useState } from 'react'; // React hook for managing component state.

function NavbarComponent() {  // Main Navbar component.
  const { itemCount } = useCart(); // To show cart badge (number of items).
  const [isOpen, setIsOpen] = useState(false); // State to track if the mobile menu is open.

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg border-b-2 border-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
            ShopHub
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-gray-700 hover:text-purple-600 transition font-medium">
              Shop
            </Link>
            <Link href="/cart" className="relative text-gray-700 hover:text-purple-600 transition font-medium">
              Cart
              {itemCount > 0 && ( // Show badge only if there are items in the cart.
                <span className="absolute -top-2 -right-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"> 
                  {itemCount} //Badge showing number of items in cart.
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)} // Toggles menu open/close Visible only on mobile
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
           // Hamburger icon lines three lines Visible only on mobile
            <div className={`w-6 h-0.5 bg-gray-700 transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div> 
            <div className={`w-6 h-0.5 bg-gray-700 transition-opacity ${isOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-gray-700 transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && ( // conditional rendering Show mobile menu only when isOpen is true
          <div className="md:hidden pb-4 border-t border-gray-100">
            <Link href="/products" onClick={() => setIsOpen(false)} className="block px-2 py-2 text-gray-700 hover:text-purple-600 transition"> 
              Shop 
            </Link> // Closes menu on link click
            <Link href="/cart" onClick={() => setIsOpen(false)} className="block px-2 py-2 text-gray-700 hover:text-purple-600 transition">
              Cart ({itemCount})
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export function Navbar() {
  return <NavbarComponent />;
}

export default Navbar;
