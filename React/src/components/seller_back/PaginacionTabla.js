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
        {pageNumbers.map((number) => (
          <Pagination.Item key={number}>
            <a onClick={() => paginate(number)}>{number}</a>
          </Pagination.Item>
        ))}
      </ul>
    </nav>
  )
}

export default PaginacionTabla