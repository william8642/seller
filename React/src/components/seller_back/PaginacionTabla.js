import React from 'react'
import { Pagination } from 'react-bootstrap'

const PaginacionTabla = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className="pagination">
      <li><a href="#">&laquo;</a></li>
        {pageNumbers.map((number) => (
          <Pagination.Item key={number}>
            <a onClick={() => paginate(number)}>
            {number}</a>
          </Pagination.Item>
        ))}
        <li><a href="#">&raquo;</a></li>
      </ul>
    </nav>
  )
}

export default PaginacionTabla