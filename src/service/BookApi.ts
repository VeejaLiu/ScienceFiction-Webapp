import axios from "axios";

const backendUrl = "http://127.0.0.1:8080";


/*
create table book
(
    id             bigint auto_increment
        primary key,
    book_name      varchar(200)                       null,
    book_author    bigint                             null,
    book_category  bigint                             null,
    book_tags      json                               null,
    book_images    varchar(1024)                      null,
    book_file_path bigint                             null,
    create_date    datetime default CURRENT_TIMESTAMP not null,
    update_date    datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
);
 */

export interface GetAllBookResult {
    books: Book[];
    total: number;
}

export interface Book {
    bookID: number;
    bookName: string;
    bookAuthor: number;
    bookCategory: number;
    bookTags: string;
    bookImages: string;
    bookFilePath: number;
    createDate: string;
    updateDate: string;
}

/**
 * Book API
 */
export class BookApi {

    /**
     * Get all books
     */
    static async getAllBook(params: { offset: number; limit: number; bookName: string }): Promise<GetAllBookResult> {
        let getAllBookResult: GetAllBookResult = {
            books: [],
            total: 0
        };
        try {
            const response = await axios.get(`${backendUrl}/books?limit=${params.limit}&offset=${params.offset}&bookName=${params.bookName}`);
            if (response.status === 200) {
                getAllBookResult = response.data;
            }
        } catch (e) {
            console.log(e);
        }
        return getAllBookResult;
    }
}