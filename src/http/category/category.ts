import { basicUrl, HttpService } from '../../services';
import { Category } from '../../types/category';

const categoryBasicUrl = `${basicUrl}/category`;

export async function getAllCategory(): Promise<Category[]> {
  try {
    const response = await HttpService.get(`${categoryBasicUrl}/getAllCategory`);
    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
}
