export interface User {
  id: number;
  name: string;
  nickname: string;
  email: string;
  is_delete?: string;
  create_date?: Date;
  update_date?: Date;
}
