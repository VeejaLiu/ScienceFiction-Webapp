import {Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Author, AuthorApi} from "../../service/AuthorApi";

function AuthorPage() {

    // authors useState, type is Author[]
    const [authors, setAuthors] = useState<Author[]>([]);
    useEffect(() => {
        const getAuthors = async () => {
            const authors = await AuthorApi.getAllAuthor();
            setAuthors(authors);
        };
        getAuthors();
    }, []);

    return (
        <div>
            <h1>所有作者</h1>
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>姓名</th>
                        <th>国籍</th>
                        <th>简介</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        authors.map((author) => {
                            return (<tr key={author.id}>
                                <td>{author.id}</td>
                                <td>
                                    <a href='/#'>
                                        {`${author.authorFirstName} ${author.authorLastName}`}
                                    </a>
                                </td>
                                <td>
                                    {author.authorNation}
                                </td>
                                <td>
                                    {author.authorInformations}
                                </td>
                            </tr>);
                        })
                    }
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default AuthorPage;