import React from 'react';
import { Heart } from 'lucide-react';
import { Product } from 'lib/shopify/types';

const WishlistButton = ({ product }: { product: Product }) => {
  const initialWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const [wishlist, setWishlist] = React.useState(initialWishlist);

  const isProductInWishlist = wishlist.some((item: Product) => item.id === product.id);

  // Function to toggle a product in the wishlist
  const toggleWishlist = () => {
    // Check if the product is already in the wishlist
    const isProductInWishlist = wishlist.some((item: Product) => item.id === product.id);

    if (!isProductInWishlist) {
      // Add the product to the wishlist
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);
    } else {
      // Remove the product from the wishlist
      const updatedWishlist = wishlist.filter((item: Product) => item.id !== product.id);
      setWishlist(updatedWishlist);
    }
  };

  // Save the wishlist to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <Heart
      className={`cursor-pointer ${isProductInWishlist ? 'text-red-600' : 'hover:text-red-600 '}`}
      onClick={() => {
        toggleWishlist();
      }}
    />
  );
};

export default WishlistButton;
