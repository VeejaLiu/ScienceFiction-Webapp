export interface Book {
  id: number;
  bookName: string;
  bookAuthor: string;
  bookCategory: string;
  bookTags: string;
  bookImages: string;
  bookFilePath: string;
  is_delete?: string;
  create_date?: Date;
  update_date?: Date;
}
