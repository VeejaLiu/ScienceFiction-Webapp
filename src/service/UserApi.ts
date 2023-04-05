import axios from "axios";

const backendUrl = "http://127.0.0.1:8080";

export class UserApi {
    public static async login(params: {
        username?: string;
        email?: string;
        password: string;
    }): Promise<any> {
        console.log(params);
        let userInfo = {};
        const response = await axios.post(`${backendUrl}/user/login`, params);
        console.log(response);
        // return userInfo;
    }
}