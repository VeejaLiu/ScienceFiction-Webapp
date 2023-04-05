import {Button, Form, Pagination, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Category, CategoryApi} from "../../service/CategoryApi";

function CategoryPage() {

    // categories result
    const [categories, setCategories] = useState<Category[]>([]);
    // categories count
    const [categoriesCount, setCategoriesCount] = useState<number>(0);

    // is search state
    const [isSearch, setIsSearch] = useState<boolean>(false);
    // search keyword
    const [keyword, setKeyword] = useState<string>("");

    // number of categories per page
    const [perPage, setPerPage] = useState<number>(10);
    // current page
    const [currentPage, setCurrentPage] = useState<number>(1);

    // pageCount
    const [pageCount, setPageCount] = useState<number>(0);
    // create an array of page numbers to display in the pagination component
    const [pageNumbers, setPageNumbers] = useState<number[]>([]);

    // get categories
    const getCategories = async () => {
        setIsSearch(true);
        const getAllCategoryResult = await CategoryApi.getAllCategory({
            keyword: keyword,
            offset: (currentPage - 1) * perPage,
            limit: perPage
        });
        console.log("getAllCategoryResult. categories.length=" + getAllCategoryResult.categories.length + " total=" + getAllCategoryResult.total);
        await setCategories(getAllCategoryResult.categories);
        await setCategoriesCount(getAllCategoryResult.total);

        if (getAllCategoryResult.total === 0) {
            await setPageCount(0);
            await setPageNumbers([]);
            await setIsSearch(false);
            return;
        }
        const pageCount = Math.ceil(getAllCategoryResult.total / perPage);
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
        console.log("booksPerPage or currentPage changed! perPage=" + perPage + " currentPage=" + currentPage);
        getCategories();
    }, [currentPage, perPage]);

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

                {/* 按照分类搜索 */}
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                }}>
                    <Form.Label style={{}} htmlFor="bookName"><b>分类: </b></Form.Label>
                    <Form.Control
                        onChange={(event: any) => {
                            setKeyword(event.target.value);
                        }}
                        style={{width: '15rem'}}
                        type="text"
                        id="bookName"
                    />
                    {/* 搜索按钮 */}
                    <Button style={{
                        width: '6rem'
                    }} variant="success" onClick={getCategories}>搜索</Button>
                </div>


                {/* 每页数量选项 */}
                <Form.Select
                    style={{width: '10rem'}}
                    aria-label="Default select example"
                    onChange={(event) => {
                        setPerPage(parseInt(event.target.value) || 20)
                    }}
                    value={perPage}
                >
                    <option value="5">每页数量: 5</option>
                    <option value="10">每页数量: 10</option>
                    <option value="20">每页数量: 20</option>
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
                (!isSearch && categories.length === 0) && (
                    <div style={{margin: "2rem"}}>
                        <h1>没有搜索到目录</h1>
                    </div>
                )
            }

            {
                (!isSearch && categories.length > 0) && (
                    <div style={{margin: "2rem"}}>
                        <h1>搜索到 {categoriesCount} 个目录</h1>
                        <Table
                            // striped
                            bordered
                            // hover
                            size="sm"
                        >
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>分类</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                categories.map((book) => {
                                    return (<tr key={book.id}>
                                        <td>{book.id}</td>
                                        <td>
                                            {/* go to book detail page */}
                                            <Link to={`/book/${book.id}`}>
                                                {book.categoryName}
                                            </Link>
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

export default CategoryPage;
