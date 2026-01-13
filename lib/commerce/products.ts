// Product management utilities

import { Product, CartItem, Cart } from '../../types/commerce';

/**
 * Calculate the total price of a cart
 */
export const calculateCartTotal = (cart: Cart): number => {
  return cart.items.reduce((total, item) => {
    const itemPrice = item.selectedVariant 
      ? item.selectedVariant.price * item.quantity 
      : item.product.price * item.quantity;
    return total + itemPrice;
  }, 0);
};

/**
 * Calculate subtotal (without tax/shipping)
 */
export const calculateSubtotal = (cart: Cart): number => {
  return cart.items.reduce((total, item) => {
    const itemPrice = item.selectedVariant 
      ? item.selectedVariant.price * item.quantity 
      : item.product.price * item.quantity;
    return total + itemPrice;
  }, 0);
};

/**
 * Add an item to cart
 */
export const addToCart = (
  cart: Cart,
  product: Product,
  quantity: number = 1,
  selectedVariant?: any
): Cart => {
  const existingItemIndex = cart.items.findIndex(
    item => 
      item.product.id === product.id && 
      item.selectedVariant?.id === selectedVariant?.id
  );

  if (existingItemIndex > -1) {
    // Update existing item
    const updatedItems = [...cart.items];
    updatedItems[existingItemIndex] = {
      ...updatedItems[existingItemIndex],
      quantity: updatedItems[existingItemIndex].quantity + quantity,
    };
    
    return {
      ...cart,
      items: updatedItems,
      subtotal: calculateSubtotal({ ...cart, items: updatedItems }),
    };
  } else {
    // Add new item
    const newItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      product,
      quantity,
      selectedVariant,
      price: selectedVariant ? selectedVariant.price : product.price,
    };

    return {
      ...cart,
      items: [...cart.items, newItem],
      subtotal: calculateSubtotal({ ...cart, items: [...cart.items, newItem] }),
    };
  }
};

/**
 * Update item quantity in cart
 */
export const updateCartItemQuantity = (
  cart: Cart,
  itemId: string,
  quantity: number
): Cart => {
  if (quantity <= 0) {
    return removeCartItem(cart, itemId);
  }

  const updatedItems = cart.items.map(item => {
    if (item.id === itemId) {
      return { ...item, quantity };
    }
    return item;
  });

  return {
    ...cart,
    items: updatedItems,
    subtotal: calculateSubtotal({ ...cart, items: updatedItems }),
  };
};

/**
 * Remove an item from cart
 */
export const removeCartItem = (cart: Cart, itemId: string): Cart => {
  const updatedItems = cart.items.filter(item => item.id !== itemId);
  
  return {
    ...cart,
    items: updatedItems,
    subtotal: calculateSubtotal({ ...cart, items: updatedItems }),
  };
};

/**
 * Clear the entire cart
 */
export const clearCart = (): Cart => {
  return {
    items: [],
    subtotal: 0,
    total: 0,
    itemCount: 0,
  };
};

/**
 * Get item count in cart
 */
export const getCartItemCount = (cart: Cart): number => {
  return cart.items.reduce((count, item) => count + item.quantity, 0);
};

/**
 * Check if a product is in cart
 */
export const isProductInCart = (
  cart: Cart,
  productId: string,
  variantId?: string
): boolean => {
  return cart.items.some(item => {
    const productIdMatch = item.product.id === productId;
    const variantMatch = variantId 
      ? item.selectedVariant?.id === variantId 
      : !item.selectedVariant; // If no variant specified, match items without variants
    
    return productIdMatch && variantMatch;
  });
};

/**
 * Get item from cart by ID
 */
export const getCartItem = (cart: Cart, itemId: string): CartItem | undefined => {
  return cart.items.find(item => item.id === itemId);
};

/**
 * Format price for display
 */
export const formatPrice = (price: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price);
};

/**
 * Calculate discount amount
 */
export const calculateDiscount = (originalPrice: number, discountPercentage: number): number => {
  return originalPrice * (discountPercentage / 100);
};

/**
 * Apply discount to price
 */
export const applyDiscount = (originalPrice: number, discountPercentage: number): number => {
  const discountAmount = calculateDiscount(originalPrice, discountPercentage);
  return originalPrice - discountAmount;
};

/**
 * Check if product is in stock
 */
export const isProductInStock = (product: Product, variant?: any): boolean => {
  if (variant) {
    return variant.inStock && (variant.stockQuantity === undefined || variant.stockQuantity > 0);
  }
  return product.inStock && (product.stockQuantity === undefined || product.stockQuantity > 0);
};

/**
 * Get available stock quantity
 */
export const getAvailableStock = (product: Product, variant?: any): number => {
  if (variant && variant.stockQuantity !== undefined) {
    return variant.stockQuantity;
  }
  return product.stockQuantity !== undefined ? product.stockQuantity : 0;
};

/**
 * Filter products by category
 */
export const filterProductsByCategory = (products: Product[], category: string): Product[] => {
  return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
};

/**
 * Filter products by tag
 */
export const filterProductsByTag = (products: Product[], tag: string): Product[] => {
  return products.filter(product => 
    product.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
  );
};

/**
 * Search products by name or description
 */
export const searchProducts = (products: Product[], searchTerm: string): Product[] => {
  const lowerSearchTerm = searchTerm.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerSearchTerm) || 
    product.description.toLowerCase().includes(lowerSearchTerm)
  );
};

/**
 * Sort products by price
 */
export const sortProductsByPrice = (products: Product[], order: 'asc' | 'desc' = 'asc'): Product[] => {
  return [...products].sort((a, b) => {
    const priceA = order === 'asc' ? a.price : b.price;
    const priceB = order === 'asc' ? b.price : a.price;
    return priceA - priceB;
  });
};

/**
 * Sort products by name
 */
export const sortProductsByName = (products: Product[], order: 'asc' | 'desc' = 'asc'): Product[] => {
  return [...products].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (order === 'asc') {
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    } else {
      return nameB < nameA ? -1 : nameB > nameA ? 1 : 0;
    }
  });
};

/**
 * Get products on sale (with discount)
 */
export const getProductsOnSale = (products: Product[]): Product[] => {
  // This would typically check for products with special pricing
  // For now, we'll return all products
  return products;
};

/**
 * Calculate total weight of cart for shipping
 */
export const calculateCartWeight = (cart: Cart): number => {
  // Assuming each item has a weight property (not in our type but could be extended)
  // For now, returning a default calculation
  return cart.items.reduce((weight, item) => {
    // In a real implementation, this would use actual product weights
    return weight + (item.quantity * 0.5); // 0.5 kg per item as default
  }, 0);
};

/**
 * Validate cart items
 */
export const validateCart = (cart: Cart): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  for (const item of cart.items) {
    if (item.quantity <= 0) {
      errors.push(`Item ${item.product.name} must have a quantity greater than 0`);
    }
    
    if (!isProductInStock(item.product, item.selectedVariant)) {
      errors.push(`Item ${item.product.name} is out of stock`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};