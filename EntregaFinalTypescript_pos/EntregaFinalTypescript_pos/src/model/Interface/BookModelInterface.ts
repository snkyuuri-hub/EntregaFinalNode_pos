export default interface BookModelInterface {
  id: number;
  title: string;
  author: string;
  year?: number;
  isbn?: string;
  publisherId?: number;
  reference?: string; //integração com Mercado Pago
  status?: string;    
  createdAt?: Date;
  updatedAt?: Date;
}