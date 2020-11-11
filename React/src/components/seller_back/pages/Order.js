import React, { useState, useEffect } from 'react'
import '../../../style/CW_items.scss'
import '../../../style/Search.css'
import { Button } from 'react-bootstrap'
import { MdAddCircle, MdModeEdit, MdDelete } from 'react-icons/md'
import PaginacionTabla from '../PaginacionTabla'
import Container from 'react-bootstrap/Container'
import { withRouter } from 'react-router-dom'
import moment from 'moment'





   
function Order(props) {
    const [commodity, setCommodity] = useState([])
    const [dataLoading, setDataLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5)
    const [Option, setOption]= useState(0)
    const [inputSearch,setInputSearch]=useState('')


    const onChange = (e) => {
      setOption(e.target.value)
    }

    async function getUsersFromServer() {
      // 開啟載入指示
      setDataLoading(true)
  
      // 連接的伺服器資料網址
      const url = 'http://localhost:3000/seller/get-db'
  
      // 注意header資料格式要設定，伺服器才知道是json格式
      const request = new Request(url, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
          bodys:JSON.stringify({Options:Option, inputSearch}),
        }),
      })
    }


    useEffect(()=>{
        fetch('http://localhost:3000/seller/get-db',{
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
          
        })

    .then((res)=>{
        // console.log(res.json());
        return res.json()
    })
    .then((res)=>{
        // console.log(res)
        setCommodity(res)
      
    })

    },[])





    const deletcUserFromServer = async (sid) => {
      const res = await fetch('http://localhost:3000/seller/del/' + sid, {
      method: 'DELETE',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const data = [...(await res.json())]

    console.log(data)
    if (!data.sid) {
      const newProducts = data.filter((v, i) => {
        return v.sid !== sid
      })

      setCommodity(newProducts)
      alert('刪除完成')
    }
  }
  useEffect(() => {
    getUsersFromServer()
  }, [commodity])

  
    // 一開始就會開始載入資料
    useEffect(() => {
      console.log(123)
      getUsersFromServer()
    }, [])
  
    // 每次users資料有變動就會X秒後關掉載入指示
    useEffect(() => {
      setTimeout(() => {
        setDataLoading(false)
      }, 1000)
    }, [commodity])

    //搜尋
    // const { setOption, Option } = props
    // const onChange = (e) => {
    //   setOption(e.target.value)
    // }



  const loading = (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  )

      // 設定頁碼
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentorder = commodity.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

    

          const display = (
           <>  
           
<Container>
        <div class="shop_list-search">
          <img src="" alt="" />{' '}
          <input type="text" name="" id="" placeholder="Search" />
          <select  onChange={onChange} value={Option} class="shop_list-order">
            <option value="0">時間由遠到近</option>
            <option value="1">時間由近到遠</option>
          </select>
          <select onChange={onChange} value={Option} class="shop_list-order">
            <option value="2">未出貨</option>
            <option value="3">已出貨</option>
          </select>
        </div>
      </Container>

      
      <PaginacionTabla
            postsPerPage={postsPerPage}
            totalPosts={commodity.length}
            paginate={paginate}
          />

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
                <td>{moment(value.Time).format('YYYY-MM-DD')}</td>
                <td>{value.ShippingMethods}</td>
                <td>{value.Status}

                </td>
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
    )

    return (
      <>
      <div className="container">
        <h3>訂單列表</h3>
       <hr />
        {dataLoading ? loading : display}
      </div>
    </>
  )
    }   
  export default withRouter (Order)