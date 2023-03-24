import {Table} from "react-bootstrap";
import {Book, BookApi} from "../../service/BookApi";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function BookPage() {

    // books useState, type is Book[]
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const getBooks = async () => {
            const books = await BookApi.getAllBook();
            setBooks(books);
        };
        getBooks();
    }, []);

    return (
        <div>
            <h1>所有书籍</h1>
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>书名</th>
                        <th>作者</th>
                        <th>标签</th>
                        <th>文件</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        books.map((book) => {
                            return (<tr key={book.id}>
                                <td>{book.id}</td>
                                <td>
                                    {/* go to book detail page */}
                                    <Link to={`/book/${book.id}`}>
                                        {book.bookName}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/author/${book.bookAuthor}`}>
                                        {book.bookAuthor}
                                    </Link>
                                </td>
                                <td>
                                    {book.bookTags}
                                </td>
                                <td>
                                    {book.bookFilePath ? (<a href="/book/#">book.bookFilePath</a>) : '暂无文件'}
                                </td>
                            </tr>);
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default BookPage;
