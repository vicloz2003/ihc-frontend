export interface Product {
  id: string;
  name: string;
  price: number;
  image: any; // usamos require(), por eso "any"
  quantity?: number;
}
