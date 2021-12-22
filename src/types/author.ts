export interface Author {
  id: number;
  authorFirstName: string;
  authorInformations: string | null;
  authorLastName: string | null;
  authorNation: string | null;
  is_delete?: string;
  create_date?: Date;
  update_date?: Date;
}
