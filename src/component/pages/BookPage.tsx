import {Button, Form, Pagination, Table} from "react-bootstrap";
import {Book, BookApi} from "../../service/BookApi";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Tag from "../tag/Tag";

function BookPage() {

    // books useState, type is Book[]
    const [books, setBooks] = useState<Book[]>([]);
    // books count
    const [booksCount, setBooksCount] = useState<number>(0);

    // is search state
    const [isSearch, setIsSearch] = useState<boolean>(false);
    // search book name
    const [searchBookName, setSearchName] = useState<string>("");

    // number of books to display per page
    const [booksPerPage, setBooksPerPage] = useState<number>(20);
    // current page useState, type is number
    const [currentPage, setCurrentPage] = useState<number>(1);

    // pageCount
    const [pageCount, setPageCount] = useState<number>(0);
    // create an array of page numbers to display in the pagination component
    const [pageNumbers, setPageNumbers] = useState<number[]>([]);

    // get books
    const getBooks = async () => {
        setIsSearch(true);
        const getAllBookResult = await BookApi.getAllBook({
            bookName: searchBookName,
            offset: (currentPage - 1) * booksPerPage,
            limit: booksPerPage
        });
        console.log("getAllBookResult. books.length=" + getAllBookResult.books.length + " total=" + getAllBookResult.total);
        await setBooks(getAllBookResult.books);
        await setBooksCount(getAllBookResult.total);

        if (getAllBookResult.total === 0) {
            await setPageCount(0);
            await setPageNumbers([]);
            await setIsSearch(false);
            return;
        }
        const pageCount = Math.ceil(getAllBookResult.total / booksPerPage);
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
    }

    // change booksPerPage or currentPage, then get books
    useEffect(() => {
        console.log("booksPerPage or currentPage changed! booksPerPage=" + booksPerPage + " currentPage=" + currentPage);
        getBooks();
    }, [currentPage, booksPerPage]);

    function getTags(bookTags: string) {
        const tags = JSON.parse(bookTags);
        return tags.map((tag: string) => {
            return (<Tag key={tag} text={tag}/>);
        });
    }

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

                {/* 按照书名搜索 */}
                <div style={{
                    // backgroundColor: "#111",
                    // height: '3rem',
                    display: "flex",
                    flexDirection: "row",
                }}>
                    {/*垂直居中显示*/}
                    <Form.Label style={{
                        // 垂直居中显示
                        alignItems: "center",
                    }} htmlFor="bookName"><b>书名: </b></Form.Label>
                    <Form.Control
                        onChange={(event: any) => {
                            setSearchName(event.target.value);
                        }}
                        style={{width: '15rem'}}
                        type="text"
                        id="bookName"
                    />
                    {/* 搜索按钮 */}
                    <Button style={{
                        width: '6rem'
                    }} variant="success" onClick={getBooks}>搜索</Button>
                </div>


                {/* 每页数量选项 */}
                <Form.Select
                    style={{width: '10rem'}}
                    aria-label="Default select example"
                    onChange={(event) => {
                        setBooksPerPage(parseInt(event.target.value) || 20)
                    }}
                    value={booksPerPage}
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
                (!isSearch && books.length === 0) && (
                    <div style={{margin: "2rem"}}>
                        <h1>没有搜索到书籍</h1>
                    </div>
                )
            }

            {
                (!isSearch && books.length > 0) && (
                    <div style={{margin: "2rem"}}>
                        <h1>搜索到 {booksCount} 本书籍</h1>
                        <Table
                            // striped
                            bordered
                            // hover
                            size="sm"
                        >
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>书名</th>
                                <th>作者</th>
                                <th>分类</th>
                                <th>标签</th>
                                <th>文件</th>
                                {/*<th>创建时间</th>*/}
                                {/*<th>更新时间</th>*/}
                            </tr>
                            </thead>
                            <tbody>
                            {
                                books.map((book) => {
                                    return (<tr key={book.bookID}>
                                        <td>{book.bookID}</td>
                                        <td>
                                            {/* go to book detail page */}
                                            <Link to={`/book/${book.bookID}`}>
                                                {book.bookName}
                                            </Link>
                                        </td>
                                        <td>
                                            {/* go to author detail page */}
                                            <Link to={`/author/${book.bookAuthor}`}>
                                                {book.bookAuthor}
                                            </Link>

                                        </td>
                                        <td>
                                            {/* go to category detail page */}
                                            <Link to={`/category/${book.bookCategory}`}>
                                                {book.bookCategory}
                                            </Link>
                                        </td>
                                        <td>
                                            {
                                                getTags(book.bookTags)
                                            }
                                        </td>
                                        <td>
                                            {book.bookFilePath ? (<a href="/book/#">book.bookFilePath</a>) : '暂无文件'}
                                        </td>
                                    </tr>)
                                        ;
                                })}
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

export default BookPage;
