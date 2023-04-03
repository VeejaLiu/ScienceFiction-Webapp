import axios from "axios";

const backendUrl = "http://127.0.0.1:8080";


/*
create table category
(
    id            bigint auto_increment
        primary key,
    category_name varchar(200)                        not null,
    create_date   datetime  default CURRENT_TIMESTAMP not null,
    update_date   timestamp default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP
)
 */

export interface GetAllCategoryResult {
    categories: Category[];
    total: number;
}

export interface Category {
    id: number;
    categoryName: string;
}

/**
 * Book API
 */
export class CategoryApi {

    /**
     * Get all categories
     */
    static async getAllCategory(params: { offset: number; limit: number; keyword: string }): Promise<GetAllCategoryResult> {
        let getAllCategoryResult: GetAllCategoryResult = {
            categories: [],
            total: 0
        };
        try {
            const response = await axios.get(`${backendUrl}/categories?limit=${params.limit}&offset=${params.offset}&keyword=${params.keyword}`);
            if (response.status === 200) {
                getAllCategoryResult = response.data;
            }
        } catch (e) {
            console.log(e);
        }
        return getAllCategoryResult;
    }
}