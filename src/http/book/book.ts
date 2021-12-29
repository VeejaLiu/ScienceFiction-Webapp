import { basicUrl, HttpService } from '../../services';
import { Book } from '../../types/book';

const bookBasicUrl = `${basicUrl}/book`;

export async function uploadBook(e: FormData): Promise<any> {
  try {
    const response = await HttpService.post(`${bookBasicUrl}/uploadBook`, e);
    return response.data;
  } catch (e) {
    console.error(e);
    return 'failed';
  }
}

export async function getAllBook(): Promise<Book[]> {
  try {
    const response = await HttpService.get(`${bookBasicUrl}/getAllBook`);
    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function downloadBook(id: number): Promise<Book[]> {
  try {
    const response = await HttpService.get(`${bookBasicUrl}/downloadBookByID?id=${id}`);
    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
}
