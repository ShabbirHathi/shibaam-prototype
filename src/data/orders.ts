export type OrderStatus = 'Placed' | 'Packed' | 'Shipped' | 'OutForDelivery' | 'Delivered';

export interface OrderItem {
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId?: number;
  isGuest: boolean;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
  shippingAddress: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  trackingHistory: {
    status: OrderStatus;
    timestamp: string;
    description: string;
  }[];
}

export const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    userId: 1,
    isGuest: false,
    items: [
      {
        productId: 1,
        productName: 'Vintage Persian Medallion Rug',
        productImage: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80',
        quantity: 1,
        price: 899,
      },
      {
        productId: 3,
        productName: 'Moroccan Berber Shag Rug',
        productImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        quantity: 2,
        price: 549,
      },
    ],
    totalAmount: 1997,
    status: 'Shipped',
    createdAt: '2024-12-20T10:30:00Z',
    estimatedDelivery: '2024-12-30T18:00:00Z',
    shippingAddress: {
      name: 'John Doe',
      email: 'user@test.com',
      phone: '+1 234 567 8900',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
    },
    trackingHistory: [
      {
        status: 'Placed',
        timestamp: '2024-12-20T10:30:00Z',
        description: 'Order confirmed and payment received',
      },
      {
        status: 'Packed',
        timestamp: '2024-12-21T14:00:00Z',
        description: 'Items packed and ready for shipment',
      },
      {
        status: 'Shipped',
        timestamp: '2024-12-22T09:00:00Z',
        description: 'Package handed to courier - FedEx',
      },
    ],
  },
  {
    id: 'ORD-2024-002',
    userId: 1,
    isGuest: false,
    items: [
      {
        productId: 2,
        productName: 'Geometric Modern Wool Rug',
        productImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
        quantity: 1,
        price: 649,
      },
    ],
    totalAmount: 649,
    status: 'Delivered',
    createdAt: '2024-12-10T15:45:00Z',
    estimatedDelivery: '2024-12-18T18:00:00Z',
    shippingAddress: {
      name: 'John Doe',
      email: 'user@test.com',
      phone: '+1 234 567 8900',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
    },
    trackingHistory: [
      {
        status: 'Placed',
        timestamp: '2024-12-10T15:45:00Z',
        description: 'Order confirmed and payment received',
      },
      {
        status: 'Packed',
        timestamp: '2024-12-11T10:00:00Z',
        description: 'Items packed and ready for shipment',
      },
      {
        status: 'Shipped',
        timestamp: '2024-12-12T08:30:00Z',
        description: 'Package handed to courier - UPS',
      },
      {
        status: 'OutForDelivery',
        timestamp: '2024-12-17T06:00:00Z',
        description: 'Package out for delivery',
      },
      {
        status: 'Delivered',
        timestamp: '2024-12-17T14:30:00Z',
        description: 'Package delivered - Signed by: J. Doe',
      },
    ],
  },
  {
    id: 'ORD-2024-003',
    userId: 1,
    isGuest: false,
    items: [
      {
        productId: 9,
        productName: 'Luxe Silk Persian Rug',
        productImage: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80',
        quantity: 1,
        price: 2499,
      },
    ],
    totalAmount: 2499,
    status: 'Placed',
    createdAt: '2024-12-28T09:00:00Z',
    estimatedDelivery: '2025-01-05T18:00:00Z',
    shippingAddress: {
      name: 'John Doe',
      email: 'user@test.com',
      phone: '+1 234 567 8900',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
    },
    trackingHistory: [
      {
        status: 'Placed',
        timestamp: '2024-12-28T09:00:00Z',
        description: 'Order confirmed and payment received',
      },
    ],
  },
];

export const getOrderById = (orderId: string): Order | undefined => {
  return mockOrders.find(o => o.id === orderId);
};

export const getOrdersByUserId = (userId: number): Order[] => {
  return mockOrders.filter(o => o.userId === userId);
};
