// Printful API integration

interface PrintfulConfig {
  apiKey: string;
}

interface PrintfulProduct {
  id: number;
  name: string;
  variants: PrintfulVariant[];
  synced: boolean;
  thumbnail_url?: string;
}

interface PrintfulVariant {
  id: number;
  name: string;
  sku: string;
  retail_price: string;
  availability_status: string;
  in_stock: boolean;
  sync_product_id?: number;
  sync_variant_id?: number;
}

interface PrintfulSyncProduct {
  id?: number;
  name: string;
  variants: PrintfulSyncVariant[];
  thumbnails?: {
    [key: string]: string;
  };
}

interface PrintfulSyncVariant {
  id?: number;
  name: string;
  sku: string;
  retail_price: string;
  sync_product_id?: number;
  sync_variant_id?: number;
}

class PrintfulService {
  private config: PrintfulConfig;
  private baseUrl = 'https://api.printful.com';

  constructor(config: PrintfulConfig) {
    this.config = config;
  }

  /**
   * Get store information
   */
  async getStoreInfo(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/store`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Printful API error: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error fetching store info:', error);
      throw error;
    }
  }

  /**
   * Get all products
   */
  async getProducts(): Promise<PrintfulProduct[]> {
    try {
      const response = await fetch(`${this.baseUrl}/products`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Printful API error: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  /**
   * Get a specific product by ID
   */
  async getProduct(productId: number): Promise<PrintfulProduct> {
    try {
      const response = await fetch(`${this.baseUrl}/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Printful API error: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  /**
   * Get all synced products
   */
  async getSyncProducts(): Promise<PrintfulSyncProduct[]> {
    try {
      const response = await fetch(`${this.baseUrl}/sync/products`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Printful API error: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error fetching sync products:', error);
      throw error;
    }
  }

  /**
   * Create a synced product
   */
  async createSyncProduct(product: PrintfulSyncProduct): Promise<PrintfulSyncProduct> {
    try {
      const response = await fetch(`${this.baseUrl}/sync/products`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Printful API error: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error creating sync product:', error);
      throw error;
    }
  }

  /**
   * Update a synced product
   */
  async updateSyncProduct(productId: number, product: Partial<PrintfulSyncProduct>): Promise<PrintfulSyncProduct> {
    try {
      const response = await fetch(`${this.baseUrl}/sync/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Printful API error: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error updating sync product:', error);
      throw error;
    }
  }

  /**
   * Delete a synced product
   */
  async deleteSyncProduct(productId: number): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/sync/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Printful API error: ${JSON.stringify(errorData)}`);
      }

      return true;
    } catch (error) {
      console.error('Error deleting sync product:', error);
      return false;
    }
  }

  /**
   * Get order by ID
   */
  async getOrder(orderId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Printful API error: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }

  /**
   * Create a new order
   */
  async createOrder(orderData: any): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/orders`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Printful API error: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  /**
   * Calculate shipping rates for an order
   */
  async calculateShippingRates(orderData: any): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/shipping/rates`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Printful API error: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error calculating shipping rates:', error);
      throw error;
    }
  }
}

// Initialize Printful service if environment variables are present
let printfulService: PrintfulService | null = null;

if (process.env.PRINTFUL_API_KEY) {
  printfulService = new PrintfulService({
    apiKey: process.env.PRINTFUL_API_KEY,
  });
}

/**
 * Get all Printful products
 */
export const getPrintfulProducts = async (): Promise<PrintfulProduct[]> => {
  if (!printfulService) {
    console.warn('Printful service not configured');
    return [];
  }

  return printfulService.getProducts();
};

/**
 * Get a specific Printful product
 */
export const getPrintfulProduct = async (productId: number): Promise<PrintfulProduct> => {
  if (!printfulService) {
    console.warn('Printful service not configured');
    return {} as PrintfulProduct;
  }

  return printfulService.getProduct(productId);
};

/**
 * Get all synced products
 */
export const getSyncProducts = async (): Promise<PrintfulSyncProduct[]> => {
  if (!printfulService) {
    console.warn('Printful service not configured');
    return [];
  }

  return printfulService.getSyncProducts();
};

export default printfulService;