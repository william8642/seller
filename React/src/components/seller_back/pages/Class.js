import React, { useState, useEffect } from 'react'
import '../../../style/CW_items.scss'
import { Button } from 'react-bootstrap'
import { MdAddCircle, MdModeEdit, MdDelete } from 'react-icons/md'
// import PaginacionTabla from '../PaginacionTabla'
import Container from 'react-bootstrap/Container'
import { withRouter } from 'react-router-dom'


function Class(props) {
    const [classes, setClass] = useState([])
    const [dataLoading, setDataLoading] = useState(false)
  
    async function getUsersFromServer() {
      // 開啟載入指示
      setDataLoading(true)
  
      // 連接的伺服器資料網址
      const url = 'http://localhost:3000/seller/sellerClass-db'
  
      // 注意header資料格式要設定，伺服器才知道是json格式
      const request = new Request(url, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
    }

    useEffect(()=>{
        fetch('http://localhost:3000/seller/sellerClass-db',{
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'appliaction/json',
          }),
          
        })

    .then((res)=>{
        // console.log(res.json());
        return res.json()
    })
    .then((res)=>{
        // console.log(res)
        setClass(res)
    }
    )
    })


    const { setOption, Option } = props
    const onChange = (e) => {
      setOption(e.target.value)
    }

    
         return (
           <>  

<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
    <Container>
        <div class="shop_list-search">
          <img src="" alt="" />{' '}
          <input type="text" name="" id="" placeholder="Search" />
          <select onChange={onChange} value={Option} class="shop_list-order">
            <option value="0">1</option>
            <option value="1">2</option>
            <option value="2">3</option>
            <option value="3">4</option>
          </select>
        </div>
      </Container>
  </ul>
  
</nav>    





          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">姓名</th>
                <th scope="col">電話</th>
                <th scope="col">課程名稱</th>
              </tr>
              
            </thead>
            <tbody>
            
           {classes.map((value, index) => {
        return(
              <tr key={value.cid}>
                <td>{value.cid}</td>
                <td>{value.Name}</td>
                <td>{value.Phone}</td>
                <td>{value.Classname}</td>

               
                </tr> 
                
        )
            })}

              </tbody>
              </table>
        
              </>
    )}
  export default withRouter (Class)