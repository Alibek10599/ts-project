interface Author {
  id: number;
  name: string;
  surname: string;
  email: number;
}
export interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}
