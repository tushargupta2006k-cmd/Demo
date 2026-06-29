export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  features: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  items: string[];
  icon: string; // lucide icon name
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  city?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  productName?: string;
  date: string;
}

export interface CustomFurnitureRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  furnitureType: string;
  woodType: string;
  dimensions: string;
  budget: string;
  requirements: string;
  date: string;
}
