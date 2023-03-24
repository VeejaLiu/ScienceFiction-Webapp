import {Table} from "react-bootstrap";

function BookPage() {
    const getBooks = () => {
        let i = 0;
        let books = [];
        while (i < 100) {
            books.push(
                <tr key={i}>
                    <td>{i}</td>
                    <td>
                        <a href='/#'>
                            Javascript Advanced Programming (3rd Edition)
                        </a>
                    </td>
                    <td>
                        <a href='/#'>
                            [US] Nicholas C. Zakas
                        </a>
                    </td>
                    <td>11k</td>
                    <td>
                        <a href="/book/#">
                            download
                        </a>
                    </td>
                </tr>
            );
            i++;
        }
        return books;
    };

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
                        <th>字数</th>
                        <th>文件</th>
                    </tr>
                    </thead>
                    <tbody>
                    {getBooks()}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default BookPage;
