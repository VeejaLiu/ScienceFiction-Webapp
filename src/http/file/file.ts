import { basicUrl, HttpService } from '../../services';
import { File } from '../../types/file';

const fileBasicUrl = `${basicUrl}/file`;

export async function getAllFile(): Promise<File[]> {
  try {
    const response = await HttpService.get(`${fileBasicUrl}/getAllFile`);
    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
}
