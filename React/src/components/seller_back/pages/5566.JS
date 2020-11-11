import React, { useState, useEffect } from 'react'
import '../../../style/CW_items.scss'
import { Button } from 'react-bootstrap'
import { MdAddCircle, MdModeEdit, MdDelete } from 'react-icons/md'
import PaginacionTabla from '../PaginacionTabla'
import Container from 'react-bootstrap/Container'
import { withRouter } from 'react-router-dom'





   
function Order(props) {
    const [commodity, setCommodity] = useState([])
    const [dataLoading, setDataLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5)





    async function getUsersFromServer() {
      // 開啟載入指示
      setDataLoading(true)
  
      // 連接的伺服器資料網址
      const url = 'http://localhost:3000/get-db'
  
      // 注意header資料格式要設定，伺服器才知道是json格式
      const request = new Request(url, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'appliaction/json',
        }),
      })
    }

    useEffect(()=>{
        fetch('http://localhost:3000/get-db',{
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
        setCommodity(res)
    }
    )
    })

    async function deletcUserFromServer(sid) {
      // 開啟載入指示
      setDataLoading(true)
  
      // 連接的伺服器資料網址
      const url = 'http://localhost:3000/get-db/' + sid
  
      // 注意header資料格式要設定，伺服器才知道是json格式
      const request = new Request(url, {
        method: 'DELETE',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'appliaction/json',
        }),
      })
  
      const response = await fetch(request)
      const data = await response.json()
      console.log(data)
  
      // 設定資料
      if (!data.id) {
        const newUsers = commodity.filter((value, index) => {
          return value.id !== sid
        })
  
        setCommodity(newUsers)
        alert('刪除完成')
      }
    }
  
    // 一開始就會開始載入資料
    useEffect(() => {
      getUsersFromServer()
    }, [])
  
    // 每次users資料有變動就會X秒後關掉載入指示
    useEffect(() => {
      setTimeout(() => {
        setDataLoading(false)
      }, 1000)
    }, [commodity])

    //搜尋
    const { setOption, Option } = props
    const onChange = (e) => {
      setOption(e.target.value)
    }


      //設定頁碼
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentorder = commodity.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)


    
         return (
           <>  

<PaginacionTabla
            postsPerPage={postsPerPage}
            totalPosts={commodity.length}
            paginate={paginate}
          />

<Container>
        <div class="shop_list-search">
          <img src="" alt="" />{' '}
          <input type="text" name="" id="" placeholder="Search" />
          <select onChange={onChange} value={Option} class="shop_list-order">
            <option value="0">時間由遠到近</option>
            <option value="1">時間有近到遠</option>
            </select>
            <select onChange={onChange} value={Option} class="shop_list-order">
            <option value="2">未出貨</option>
            <option value="3">已出貨</option>
          </select>
        </div>
      </Container>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">姓名</th>
                <th scope="col">金額</th>
                <th scope="col">時間</th>
                <th scope="col">取貨方式</th>
                <th scope="col">出貨狀態</th>
              </tr>
              
            </thead>
            <tbody>
            
           {currentorder.map((value, index) => {
        return(
              <tr key={value.sid}>
                <td>{value.sid}</td>
                <td>{value.Customer}</td>
                <td>{value.Amount}</td>
                <td>{value.Time}</td>
                <td>{value.ShippingMethods}</td>
                <td>{value.Status}</td>
                <Button
                    variant="success"
                    onClick={() => {
                      props.history.push('/order-edit/' + value.sid)
                    }}
                  >
                    <MdModeEdit /> 編輯
                  </Button>
                  {'  '}
                  <Button
                    onClick={() => {
                      deletcUserFromServer(value.sid)
                    }}
                    variant="danger"
                  >
                    <MdDelete /> 刪除
                  </Button>
                </tr> 
                
        )
            })}

              </tbody>
              </table>
        
              </>
    )}
  export default withRouter (Order)