import { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

function Homepage() {
  const orders = useLoaderData();
  return (
    <div id="homepage">
    <Header />
    <Categories />
    <div id="recentTrayHolder">
      <div id="recentinfo">Recently uploaded orders</div>
      <RecentItemTray orders={orders} />
    </div>
    </div>
  );
}

export function Header({searchField}) {
  return (
  <div id="header">
    <Logo />
    <Search initialFieldValue={searchField}/>
      <Link to='/post'><button id="post" >Post an order</button></Link>
    <Profile />
  </div>
  );
}

function Profile() {
  return (
    <div id="profile">
      <Link to='/login'>
        <button id="login" className="logButtons">login</button>
      </Link>
      <Link to='/signup'>
        <button id="signup" className="logButtons">Sign Up</button>
      </Link>
    </div>
  );
}

export function Logo() {
  return (
    <Link to='/' id="logo">
      <img id='logoImage' src="/images/logo.png" />
    </Link>
  );
}

export function RecentItemTray({ orders }) {
  const orderRow = orders.map(
    (eachOrder) => <RecentItem key={eachOrder.order_id} order={eachOrder} />
  );
  return (
    <div id="recentTray">{orderRow}</div>
  );
}

function RecentItem({ order }) {
  const bgcolor = order.order_type == 'sell' ? 'red' : 'blue'
  function ago(time) {
    let days, hours, mins
    time /= 1000
    time = Math.round(time)
    days = Math.floor(time / 86400)
    time -= 86400*days
    hours = Math.floor(time / (60*60))
    time -= hours*60*60
    mins = Math.floor(time / 60)
    return {day: days, hour: hours, min: mins}

  }
          const nigga = Date.now() - Date.parse(order.date)
          const date = ago(nigga)
          console.log(date)
          console.log(nigga)
  return (
    <Link key={order.order_id} to={`/orders/${order.order_id}`}>
      <div id="recentItem">
        <div id="ordertype" style={{backgroundColor: bgcolor}}>
          {order.order_type}
        </div>
        <div id="recentImage">
          <img src={order.img_src} /><br/>
        </div> 
        <div id="ordername">{ order.product_name }</div>
        <div id="productdesc">{order.description}</div>
        <div id="price">
          Rs.{ new Intl.NumberFormat('en-IN').format(order.price) }
        </div>
        <div id="time">
          <div style={{
            height: '25px',
            overflow: 'clip',
            display: 'flex',
            alignItems: 'center'  
          }}>
            <img src="/images/clock.png" style={{height: '30px', width: 'auto'}}></img>
          </div>
          <div id="stamp" style={{fontSize: '15px', color: 'grey'}}>
            {date.day ? `${date.day}d`: ''} {date.hour? `${date.hour}h`: ''} {date.min ? `${date.min}`: '1'}m ago
          </div>
          
        </div>
      </div>
    </Link>
  );
}
function Search({initialFieldValue}) {
  const [query, setQuery] = useState(initialFieldValue)
  const navigate = useNavigate()
  return (
    <form id="search"
      onSubmit={(e) => {
        e.preventDefault()
        navigate(`/search?name=${encodeURIComponent(query)}`)
      }}
    >
      <input type="text" name="search" 
        placeholder="Search..." value={query}
        onChange={(e)=> setQuery(e.target.value)} required/>
      <button type="submit"><img id="icon" src="/images/searchicon.png" /></button>
    </form>
  )
}

function CategoryItems({ product}) {
  return <div id="categoryItem">{ product }<br/></div>
}


export function Categories() {
  return (
    <div id="categories">
      <div id="categoryHeading">Categories</div><br/> 
      <CategoryItems product={'Electronics'} />
      <CategoryItems product={'Kitchen Ware'} />
      <CategoryItems product={'Books'} />
      <CategoryItems product={'Tools'} />
      </div>
  )
}

export default function App() {
  return (
    <Homepage />
  );

}
