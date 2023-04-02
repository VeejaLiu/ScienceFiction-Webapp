import {Button, Form, Pagination, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Author, AuthorApi} from "../../service/AuthorApi";

function AuthorPage() {

    // authors useState, type is Author[]
    const [authors, setAuthors] = useState<Author[]>([]);
    // authors count
    const [authorsCount, setAuthorsCount] = useState<number>(0);

    // is search state
    const [isSearch, setIsSearch] = useState<boolean>(false);
    // search author name
    const [keyword, setKeyword] = useState<string>("");

    // number of authors per page
    const [authorsPerPage, setAuthorsPerPage] = useState<number>(10);
    // current page
    const [currentPage, setCurrentPage] = useState<number>(1);

    // page count
    const [pageCount, setPageCount] = useState<number>(0);
    // pagation array
    const [pageNumbers, setPageNumbers] = useState<number[]>([]);


    const getAuthors = async () => {
        setIsSearch(true);
        const getAllAuthorResult = await AuthorApi.getAllAuthor({
            keyword: keyword,
            offset: (currentPage - 1) * authorsPerPage,
            limit: authorsPerPage
        });
        await setAuthors(getAllAuthorResult.authors || []);
        await setAuthorsCount(getAllAuthorResult.total || 0);

        if (getAllAuthorResult.total === 0) {
            await setPageCount(0);
            await setPageNumbers([]);
            setIsSearch(false);
            return;
        }

        const pageCount = Math.ceil(getAllAuthorResult.total / authorsPerPage);
        await setPageCount(pageCount);
        const pageNumbers: number[] = [];
        for (let i = 1; i <= pageCount; i++) {
            pageNumbers.push(i);
        }
        await setPageNumbers(pageNumbers);
        console.log("pageNumbers=" + pageNumbers);
        if (currentPage > pageCount) {
            setCurrentPage(pageCount);
        }
        setIsSearch(false);
    };

    useEffect(() => {
        getAuthors();
    }, [currentPage, authorsPerPage]);

    return (
        <div>
            {/* 搜索条件 */}
            <div style={{
                margin: "1rem 2rem",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>

                {/* 按照作者名搜索 */}
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                }}>
                    <Form.Label style={{}} htmlFor="authorName"><b>作者: </b></Form.Label>
                    <Form.Control
                        onChange={(event: any) => {
                            setKeyword(event.target.value);
                        }}
                        style={{width: '15rem'}}
                        type="text"
                        id="authorName"
                    />
                </div>

                {/* 搜索按钮 */}
                <Button variant="success" onClick={getAuthors}>
                    搜索
                </Button>

                {/* 每页数量选项 */}
                <Form.Select
                    style={{width: '10rem'}}
                    aria-label="Default select example"
                    onChange={(event) => {
                        setAuthorsPerPage(parseInt(event.target.value) || 20)
                    }}
                    value={authorsPerPage}
                >
                    <option value="5">每页数量: 5</option>
                    <option value="10">每页数量: 10</option>
                    <option value="20">每页数量: 20</option>
                    <option value="50">每页数量: 50</option>
                    <option value="100">每页数量: 100</option>
                </Form.Select>
            </div>

            {(
                isSearch && (
                    <div style={{margin: "2rem"}}>
                        <h1>搜索中...</h1>
                    </div>
                )
            )}

            {
                (!isSearch && authors.length === 0) && (
                    <div style={{margin: "2rem"}}>
                        <h1>没有搜索到作者</h1>
                    </div>
                )
            }

            {
                (!isSearch && authors.length > 0) && (
                    <div style={{margin: "2rem"}}>
                        <h1>搜索到 {authorsCount} 个作者</h1>
                        <Table
                            // striped
                            bordered
                            // hover
                            size="sm">
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
                )
            }

            {/* 分页组件 */}
            {(pageNumbers.length > 1 && !isSearch) && (
                <>
                    {/* 分页组件 居中显示 */}
                    <div style={{margin: "auto 2rem"}}>
                        <Pagination size={undefined} bsPrefix="">
                            {/* First page */}
                            <Pagination.First onClick={() => {
                                if (currentPage === 1)
                                    return;
                                setCurrentPage(1)
                            }}/>

                            {/* Prev page */}
                            <Pagination.Prev onClick={() => {
                                if (currentPage === 1)
                                    return;
                                setCurrentPage(currentPage - 1)
                            }}/>

                            {/* ... Page */}
                            {
                                (currentPage - 2 > 1) && (
                                    <><Pagination.Ellipsis/></>
                                )
                            }

                            {/* Every Page */}
                            {
                                pageNumbers.map((pageNumber) => {
                                    if (Math.abs(pageNumber - currentPage) <= 2) {
                                        return (
                                            <Pagination.Item key={pageNumber}
                                                             active={pageNumber === currentPage}
                                                             onClick={() => setCurrentPage(pageNumber)}>
                                                {pageNumber}
                                            </Pagination.Item>
                                        );
                                    } else {
                                        return null;
                                    }
                                })
                            }

                            {/* ... Page */}
                            {
                                (currentPage + 2 < pageCount) ? (
                                    <><Pagination.Ellipsis/></>
                                ) : null
                            }

                            {/* next page */}
                            <Pagination.Next onClick={() => {
                                if (currentPage >= pageCount)
                                    return;
                                setCurrentPage(currentPage + 1)
                            }}/>
                            <Pagination.Last onClick={() => setCurrentPage(pageCount)}/>
                        </Pagination>
                    </div>
                    {/* 分页组件 End */}
                </>
            )}
        </div>
    );
}

export default AuthorPage;