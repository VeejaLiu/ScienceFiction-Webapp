import { User } from '../../types/user';
import { basicUrl, HttpService } from '../../services';

const userBasicUrl = `${basicUrl}/user`;

export async function getAllUser(): Promise<User[]> {
  try {
    const response = await HttpService.get(`${userBasicUrl}/getAllUser`);
    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
}
