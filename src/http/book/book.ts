import { basicUrl, HttpService } from '../../services';

const userBasicUrl = `${basicUrl}/book`;

export async function uploadBook(e: FormData): Promise<any> {
  try {
    const response = await HttpService.post(`${userBasicUrl}/uploadBook`, e);
    return response.data;
  } catch (e) {
    console.error(e);
    return 'failed';
  }
}
