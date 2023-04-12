import axios from "axios";
import {Toast} from "react-bootstrap";

const backendUrl = "http://127.0.0.1:8080";

export async function clearUser() {
    localStorage.removeItem("science_fiction_webapp_userId");
    localStorage.removeItem("science_fiction_webapp_email");
    localStorage.removeItem("science_fiction_webapp_nickname");
    localStorage.removeItem("science_fiction_webapp_token");
}

export class UserApi {
    public static async login(params: {
        username?: string;
        email?: string;
        password: string;
    }): Promise<any> {
        let userInfo: {
            userId?: string;
            email?: string;
            nickname?: string;
            token?: string;
        } = {};
        console.log("params: " + JSON.stringify(params));
        axios.post(`${backendUrl}/user/login`, params).then((response) => {
            console.log(response);
            console.log("response.status: ", response.status);
            console.log("response.data: ", response.data);
            if (response.status === 200) {
                userInfo = response.data;
                localStorage.setItem("science_fiction_webapp_userId", userInfo?.userId || '');
                localStorage.setItem("science_fiction_webapp_email", userInfo?.email || '');
                localStorage.setItem("science_fiction_webapp_nickname", userInfo?.nickname || '');
                localStorage.setItem("science_fiction_webapp_token", userInfo?.token || '');
            }
            return userInfo;
        }).catch((err) => {
            console.log("err: ", err);
            if (err.response.status === 401) {
                console.log("401 登录失败");
                clearUser();
                // window.location.href = "/user/login";

                // show a toast


            }
        })

    }
}