export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  createdAt: string;
}

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'user@test.com',
    phone: '+1 234 567 8900',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    address: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
    },
    createdAt: '2024-01-15T10:00:00Z',
  },
];

export const getUserById = (id: number): User | undefined => {
  return mockUsers.find(u => u.id === id);
};

// Static login credentials
export const validateCredentials = (email: string, password: string): User | null => {
  if (email === 'user@test.com' && password === 'user123') {
    return mockUsers[0];
  }
  return null;
};
