export interface File {
  id: number;
  path: string;
  fileName: string;
  fileSize: string;
  is_delete?: string;
  create_date?: Date;
  update_date?: Date;
}
