import { Link, useLoaderData } from 'react-router-dom';
import {Header} from './App'

export default function ItemView({ orders }) {
    const order = useLoaderData();
    return (
        <div id="itemView" className={order.type}>
            <Header />
            <div id="imageSeller">
                <ItemImage image={order.imgSource} />
                <div id='itemPrice'>Rs. {order.price}</div>
                <OrderOwner owner={order.sellerName}/>
            </div>
            <div id="properties">
                <div id="itemName">
                    {order.name}
                </div>
                <Description description={order.description}/>
                <Comments />
            </div>
            <SimilarItemsTray similarOrders={orders}/>
        </div>
    );
}

function ItemImage({ image }){
    return (
        <div id="itemImage">
            <img id="photoItem" src={image}></img>
        </div>
    )
}
function Description({ description, theme }) {
    return (
        <div id="description">
            {description}
        </div>
    )
}

function Comments() {
    return (
        <div id="comments">

        </div>
    )
}

function  SimilarItems ({order}) {
    return (
            <Link to={`/orders/${order.id}`} id='similarItem'>
                <div id='similarItemPhotoHolder'>
                    <img src={order.imgSource} id='similarItemPhoto'/>
                </div>
                <div id='similarOrdername'>{order.name}</div>
                <div id='similarPrice'>Rs. {order.price}</div>
            </Link>
    )
}
function SimilarItemsTray({similarOrders}) {
    const similarOrdersRow = similarOrders.map(
        (eachOrder) => <SimilarItems order={eachOrder} />
    );
    return (
        <div id="similarItemsTray">
            <div id='heading'>Similar Items</div>
            {similarOrdersRow}
        </div>
    )
}
function OrderOwner({owner}) {
    return (
        <div id="orderOwner">
            {owner}
        </div>
    )
}