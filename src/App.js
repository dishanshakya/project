import { useEffect, useRef, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { hostname } from ".";

function Homepage() {
  const data = useLoaderData();
  const [orders, setOrders] = useState(data.recentorders)
  return (
    <div id="homepage">
    <Header />
    <Categories list={data.categories} filter={{setOrders, data: data.recentorders}} />
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
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const [popupDisplay, setPopupDisplay] = useState(0)
  const popup = useRef()

  useEffect(()=> {
    async function validateUser(){
      const data = await fetch(`${hostname}/api/v1/auth/tokenvalidity`, {
        credentials: 'include'
      })
      if (data.status == 200)
        setUser(await data.json())
      else console.log('fucked')
    }
    validateUser()
  }, [])

  return (
    user ? <div id="profile"
      onClick={()=> {
        if (!popupDisplay){
          popup.current.style.display = 'block'
        }
        else popup.current.style.display = 'none'
        setPopupDisplay(!popupDisplay)
      }}
    >
      <div id="popup" ref={popup}>
        <Link to='/change-picture' className="popupitem " id="cpp">Change Picture</Link>
        <Link to='/change-password' className="popupitem" id="cpw">Change Password</Link>
        <div id="logout" className="popupitem"
          onClick={async () => {
            const response = await fetch(`${hostname}/api/v1/auth/logout`, {
              credentials: 'include'
            })
            if (response.status == 200)
              navigate('/login', {replace: true})
          }}
        >
          Logout
        </div>
      </div>
        <div className="img-holder" style={{height: '40px', width: '40px', borderRadius: '50%',
         border: '4px solid var(--mygrey)'}}>
          <img src={user.profile_pic_src} style={{height: '40px', width: 'auto'}}/>
        </div>
        <div id="profilename">{user.username}</div>
      </div> :
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
  if (!orders.length) {
    return <div style={{justifySelf: 'center', padding: '40px'}}>No orders!</div>
  }
  else {
  const orderRow = orders.map(
    (eachOrder) => <RecentItem key={eachOrder.order_id} order={eachOrder} />
  );
  return (
    <div id="recentTray">{orderRow}</div>
  );}
}

export function ago(time) {
  let days, hours, mins
  time /= 1000
  time = Math.round(time)
  days = Math.floor(time / 86400)
  time -= 86400*days
  hours = Math.floor(time / (60*60))
  time -= hours*60*60
  mins = Math.floor(time / 60)
  const string = (days ? `${days}d`: '') + (hours? ` ${hours}h`: '') + (mins ? ` ${mins}`: '1') +'m ago'
  return string
}

function RecentItem({ order }) {
  const bgcolor = order.order_type == 'sell' ? 'red' : 'blue'
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
            {ago(Date.now()-Date.parse(order.date))}

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

function CategoryItems({ product, filter}) {
  return <label  onClick={()=> {
    const newData = filter.data.filter((each)=> each.category == product.category_id)
    filter.setOrders(newData)
  }}>
    <input type="radio" name="category" style={{display: 'none'}}></input>
    <div id="categoryItem">{ product.category_name }<br/></div>
  </label>
}


export function Categories({list, filter}) {
  const categories = list.map((each)=> <CategoryItems key={each.category_id} product={each} filter={filter} />)
  return (
    <div id="categories">
      <div id="categoryHeading">Categories</div><br/> 
        <label >
          <input type="radio" name="category" style={{display: 'none'}} onChange={(e)=> {
            if(e.target.checked)
              filter.setOrders(filter.data)
          }}></input>
          <div id="categoryItem">All</div>
          </label>
        {categories}
      </div>
  )
}

export default function App() {
  return (
    <Homepage />
  );

}
