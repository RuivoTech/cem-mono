/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
}

const Paginacao = ({ data = [], renderItems, limiteItems = 20, pageNeighbours = 1 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageLimit = limiteItems;
    const totalRecords = data.length;
    const totalPages = Math.ceil(totalRecords / pageLimit);;
    const [paginas, setPaginas] = useState([]);
    const [counter, setCounter] = useState(0);
    const [delimiter, setDelimiter] = useState(0);

    const fetchPageNumbers = () => {
        /**
         * totalNumbers: the total page numbers to show on the control
         * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
         */
        const totalNumbers = (pageNeighbours * 2) + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {

            const startPage = Math.max(2, currentPage - pageNeighbours);
            const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

            let pages = range(startPage, endPage);

            /**
             * hasLeftSpill: has hidden pages to the left
             * hasRightSpill: has hidden pages to the right
             * spillOffset: number of hidden pages either to the left or to the right
             */
            const hasLeftSpill = startPage > 2;
            const hasRightSpill = (totalPages - endPage) > 1;
            const spillOffset = totalNumbers - (pages.length + 1);

            switch (true) {
                // handle: (1) < {5 6} [7] {8 9} (10)
                case (hasLeftSpill && !hasRightSpill): {
                    const extraPages = range(startPage - spillOffset, startPage - 1);
                    pages = [LEFT_PAGE, ...extraPages, ...pages];
                    break;
                }

                // handle: (1) {2 3} [4] {5 6} > (10)
                case (!hasLeftSpill && hasRightSpill): {
                    const extraPages = range(endPage + 1, endPage + spillOffset);
                    pages = [...pages, ...extraPages, RIGHT_PAGE];
                    break;
                }

                // handle: (1) < {4 5} [6] {7 8} > (10)
                case (hasLeftSpill && hasRightSpill):
                default: {
                    pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                    break;
                }
            }

            setPaginas([1, ...pages, totalPages]);
            return;
        }

        setPaginas(range(1, totalPages));
    }

    useEffect(() => {
        gotoPage(1);
    }, [data]);

    useEffect(() => {
        fetchPageNumbers();
    }, [currentPage]);

    const gotoPage = page => {
        const currentPage = Math.max(0, Math.min(page, totalPages));
        const offset = (currentPage - 1) * pageLimit;

        const paginationData = data.slice(offset, offset + pageLimit);

        setCounter(offset + 1);
        setDelimiter(offset + pageLimit);

        setCurrentPage(currentPage);

        renderItems(paginationData);
    }

    return (
        totalRecords === 0 ?
            <div className="dataTables_info pull-left pt-3">
                Nenhuma informação encontrada.
                </div>
            :
            <>
                <div className="dataTables_info pull-left pt-3">
                    Exibindo de {counter > totalRecords ? totalRecords : counter} a {delimiter > totalRecords ? totalRecords : delimiter} / Total {totalRecords}
                </div>
                <div className="dataTables_paginate paging_simple_numbers pull-right pt-3">
                    <ul className="pagination">
                        {paginas.map((page, index) => {
                            if (page === LEFT_PAGE) return (
                                <li key={index} className="page-item">
                                    <button className="page-link" onClick={() => gotoPage(currentPage - 1)}>
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Anterior</span>
                                    </button>
                                </li>
                            );

                            if (page === RIGHT_PAGE) return (
                                <li key={index} className="page-item">
                                    <button className="page-link" onClick={() => gotoPage(currentPage + 1)}>
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only">Próxima</span>
                                    </button>
                                </li>
                            );

                            return (
                                <li key={index} className={`page-item${currentPage === page ? ' active' : ''}`}>
                                    <button className="page-link" onClick={() => gotoPage(page)}>{page}</button>
                                </li>
                            );

                        })}

                    </ul>
                </div>
            </>
    )
}

export default Paginacao;