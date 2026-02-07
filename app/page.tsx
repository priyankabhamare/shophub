import Link from 'next/link';

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
          Welcome to ShopHub
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover amazing products with a vibrant, colorful shopping experience. Shop smart, shop colorful!
        </p>

        <Link
          href="/products"
          className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
        >
          Start Shopping →
        </Link>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition border-l-4 border-purple-500">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Wide Selection</h3>
            <p className="text-gray-600">Browse hundreds of products across multiple categories.</p>
          </div>

          <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition border-l-4 border-pink-500">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Checkout</h3>
            <p className="text-gray-600">Quick and easy shopping cart with smooth checkout process.</p>
          </div>

          <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition border-l-4 border-orange-500">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Secure & Safe</h3>
            <p className="text-gray-600">Your data is protected with secure authentication.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
