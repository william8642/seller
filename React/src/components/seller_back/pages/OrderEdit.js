import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'


function OrderEdit(props) {
    const sid = props.match.params.sid
   
  
    // const [user, setUser] = useState({})
    const [dataLoading, setDataLoading] = useState(false)
    const [Mydata,setMydata] = useState('')
    // const [sid, setSid] = useState('')
    const [customer,setCustomer] = useState('')
    const [amount, setAmount] = useState('')
    const [time, setTime] = useState('')
    const [shippingmethods, setShippingMethods] = useState('')
    const [status, setStatus] = useState('')
    // let fd = null
    const [userDataIsExist, setUserDataIsExist] = useState(true)
    // useEffect(()=>{fd= new FormData(document.form1)},[])
    async function getUserFromServer(sid) {
        // 開啟載入指示
        setDataLoading(true)
    
        // 連接的伺服器資料網址
        const url = 'http://localhost:3000/seller/get-db/'+ sid
    
        // 注意header資料格式要設定，伺服器才知道是json格式
        const request = new Request(url, {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'appliaction/json',
          }),
          
        })
    
        const response = await fetch(request)
        const data = await response.json()
        // console.log(data)
        //要詢問老師為甚麼一定要加data[0]才讀到資料
        setCustomer(data[0].Customer)
        setAmount(data[0].Amount)
        setTime(data[0].Time)
        setShippingMethods(data[0].ShippingMethods)
        setStatus(data[0].Status)

 
    
        // 如果從伺服器回傳的資料沒有id值
        if (!data.sid) {
          setUserDataIsExist(false)
          return
        }
      

        setCustomer(data.customer)
        setAmount(data.amount)
        setTime(data.time)
        setShippingMethods(data.shippingmethods)
        setStatus(data.status)


        
      }
      


    
      async function updateUserToSever() {
        // 開啟載入指示
        setDataLoading(true)
    
        const newData = { customer, amount, time, shippingmethods, status}
    
        // 連接的伺服器資料網址
        const url = 'http://localhost:3000/seller/get-db/:sid'
    
        // 注意資料格式要設定，伺服器才知道是json格式
        const request = new Request(url, {
          method: 'PUT',
          body: JSON.stringify(newData),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        })
    
       

        const response = await fetch(request)
        const data = await response.json()
   
        
        // 要等驗証過，再設定資料(簡單的直接設定)
    
        //直接在一段x秒關掉指示器
        setTimeout(() => {
          setDataLoading(false)
          alert('儲存完成')
        }, 1000)
      }

        // 一開始就會開始載入資料
  useEffect(() => {
    getUserFromServer(sid)
  }, [])

  // 每次users資料有變動就會X秒後關掉載入指示
  useEffect(() => {
    setTimeout(() => {
      setDataLoading(false)
    }, 1000)
  }, [sid])
  

  const sendData= async () => {
    
// const fd = new FormData(document.form1);
const newData = { 
  "customer": customer, 
  "amount": amount,
  "time": time,
  "shippingmethods": shippingmethods,
  "status": status }
const fd = JSON.stringify(newData)
console.log(fd)
// const fd = new FormData(formData);
const res = await fetch('http://localhost:3000/seller/edit/'+sid, {
  method: 'post',
  headers: new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
    
    
  }),
  body:fd
})

    const data = await res.json()
    setMydata(data)
    console.log(data)
  }
  // useEffect(() => {
  //   getData()
  // }, [])
  const userDataNo = <h2>此會員不存在</h2>
  const sidNo = <h2>需要會員id</h2>
  
  const loading = (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  )

  const display = (
    <>
    <form className="form1">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">姓名</label>
          <input
            name = "Customer"
            type="text"
            className="form-control"
            value={customer}
            onChange={(event) => {
              setCustomer(event.target.value)
              
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">價格</label>
          <input
            name = "Amount"
            type="text"
            className="form-control"
            value={amount}
            onChange={(event) => {
              setAmount(event.target.value)
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">日期</label>
          <input
            name = "Time"
            type="text"
            className="form-control"
            name-
            value={time}
            onChange={(event) => {
              setTime(event.target.value)
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">取貨方式</label>
          <input
            name = "ShippingMethods"
            type="text"
            className="form-control"
            value={shippingmethods}
            onChange={(event) => {
              setShippingMethods(event.target.value)
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">出貨狀態</label>
          <select
          className="form-control"
          value={status}      
          onChange={(event) => {
          setStatus(event.target.value)
          }}
          >
            <option value="0">未出貨</option>
            <option value="1">已出貨</option>
            

          </select>
        </div>
    
    
        <button
          onClick={() => {
            sendData()
          }}
          className="btn btn-primary"
        >
          儲存
        </button>
    </form>
      </>
  )
  
return (
  <>
    <h3>訂單編輯</h3>
    <hr />
    {dataLoading ? loading : display}
  </>
)
    }

export default withRouter(OrderEdit)