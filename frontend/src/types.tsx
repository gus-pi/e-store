export type ProductData = {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  imageFilename: string;
  createdAt: string;
};

export type ErrorType = {
  name: string;
  brand: string;
  category: string;
  price: string;
  description: string;
  image: string;
};

export type UserCredentials = {
  email: string;
  password: string;
};
