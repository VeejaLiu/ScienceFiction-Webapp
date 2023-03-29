// PaginationComponent.js
import React from 'react';
import {Pagination} from 'react-bootstrap';

function PaginationComponent({
                                 currentPage,
                                 pageCount,
                                 setCurrentPage
                             }: {
                                currentPage: number,
                                pageCount: number,
                                setCurrentPage: any
}) {
    const pageNumbers = [];
    for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i);
    }

    return (
        <div style={{margin: 'auto 2rem'}}>
            <Pagination size={undefined} bsPrefix="">
                {/* First page */}
                <Pagination.First
                    onClick={() => {
                        if (currentPage === 1) return;
                        setCurrentPage(1);
                    }}
                />

                {/* Prev page */}
                <Pagination.Prev
                    onClick={() => {
                        if (currentPage === 1) return;
                        setCurrentPage(currentPage - 1);
                    }}
                />

                {/* ... Page */}
                {currentPage - 2 > 1 && <Pagination.Ellipsis/>}

                {/* Every Page */}
                {pageNumbers.map((pageNumber) => {
                    if (Math.abs(pageNumber - currentPage) <= 2) {
                        return (
                            <Pagination.Item
                                key={pageNumber}
                                active={pageNumber === currentPage}
                                onClick={() => setCurrentPage(pageNumber)}
                            >
                                {pageNumber}
                            </Pagination.Item>
                        );
                    }
                })}

                {/* ... Page */}
                {currentPage + 2 < pageCount && <Pagination.Ellipsis/>}

                {/* next page */}
                <Pagination.Next
                    onClick={() => {
                        if (currentPage >= pageCount) return;
                        setCurrentPage(currentPage + 1);
                    }}
                />
                <Pagination.Last onClick={() => setCurrentPage(pageCount)}/>
            </Pagination>
        </div>
    );
}

export default PaginationComponent;
