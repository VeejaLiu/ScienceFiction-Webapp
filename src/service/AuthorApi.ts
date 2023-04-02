import axios from "axios";

const backendUrl = "http://127.0.0.1:8080";

/*
create table author
(
    id                  bigint auto_increment
        primary key,
    author_first_name   varchar(200)                        null,
    author_last_name    varchar(200)                        null,
    author_nation       varchar(10)                         null,
    author_informations text                                null,
    create_date         datetime  default CURRENT_TIMESTAMP not null,
    update_date         timestamp default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP
);
 */

export interface GetAllAuthorResult {
    authors: Author[];
    total: number;
}

export interface Author {
    id: number;
    authorFirstName: string;
    authorLastName: string;
    authorNation: string;
    authorInformations: string;
    createDate: string;
    updateDate: string;
}

/**
 * Author API
 */
export class AuthorApi {

    /**
     * Get all authors
     */
    static async getAllAuthor(params: {
        keyword: string;
        offset: number;
        limit: number;
    }): Promise<GetAllAuthorResult> {
        let authors: GetAllAuthorResult = {
            authors: [],
            total: 0
        };
        try {
            const response = await axios.get(`${backendUrl}/authors?keyword=${params.keyword}&offset=${params.offset}&limit=${params.limit}`);
            if (response.status === 200) {
                authors = response.data;
            }
        } catch (e) {
            console.log(e);
        }
        return authors;
    }
}