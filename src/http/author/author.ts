import { Author } from '../../types/author';
import { basicUrl, HttpService } from '../../services';

const authorBasicUrl = `${basicUrl}/author`;

export async function getAllAuthor(): Promise<Author[]> {
  try {
    const response = await HttpService.get(`${authorBasicUrl}/getAllAuthor`);
    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function updateAuthor(author: Author | undefined): Promise<any> {
  try {
    const response = await HttpService.post(`${authorBasicUrl}/updateAuthor`, author);
    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
}
