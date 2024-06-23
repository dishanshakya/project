import { orders } from "./imgResources";
import { Link } from "react-router-dom";

function Homepage() {
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

export function Header() {
  return (
  <div id="header">
    <Logo />
    <Search />
    <button id="post" >Post an order</button>
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

function Logo() {
  return (
    <div id="logo">LOGO</div>
  );
}

function RecentItemTray({ orders }) {
  const orderRow = orders.map(
    (eachOrder) => <RecentItem order={eachOrder} />
  );
  return (
    <div id="recentTray">{orderRow}</div>
  );
}

function RecentItem({ order }) {
  return (
    <div id="recentItem">
      <div id="recentImage">
        <img src={order.imgSource} /><br/>
      </div> 
      <div id="ordername">{ order.name }</div><br/>
      <div id="price">Price: { order.price }</div><br/>
    </div>
  );
}
function Search() {
  return (
    <form id="search">
      <input type="text" name="search" placeholder="Search..."/>
      <button type="submit"><img id="icon" src="images/searchicon.png" /></button>
    </form>
  )
}

function CategoryItems({ product}) {
  return <div id="categoryItem">{ product }<br/></div>
}


function Categories() {
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
