export interface StudentInterface {
  id: string;
  name: string;
  age: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
