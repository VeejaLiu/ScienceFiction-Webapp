import {Table} from "react-bootstrap";

function BookPage() {
    const getBooks = () => {
        let i = 0;
        let books = [];
        while (i < 10) {
            books.push(
                <tr key={i}>
                    <td>{i}</td>
                    <td>JavaScript高级程序设计（第3版）</td>
                    <td>作者：[美] Nicholas C. Zakas</td>
                    <td>11千字</td>
                    <td>
                        <a href="/book/#">
                            下载
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
