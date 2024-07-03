import { Link, useLoaderData } from 'react-router-dom';
import {Header} from './App'

export default function ItemView() {
    const {order, similar} = useLoaderData();
    return (
        <div id="itemView" className={order.type}>
            <Header />
            <div id="imageSeller">
                <ItemImage image={order.imgsource} />
                <div id='itemPrice'>Rs. {order.price}</div>
                <OrderOwner owner={order.sellerName}/>
            </div>
            <div id="properties">
                <div id="itemName">
                    {order.product_name}
                </div>
                <Description description={order.description}/>
                <Comments />
            </div>
            <SimilarItemsTray similarOrders={similar}/>
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
            <Link to={`/orders/${order.order_id}`} id='similarItem'>
                <div id='similarItemPhotoHolder'>
                    <img src={order.imgsource} id='similarItemPhoto'/>
                </div>
                <div id='similarOrdername'>{order.product_name}</div>
                <div id='similarPrice'>Rs. {order.price}</div>
            </Link>
    )
}
function SimilarItemsTray({similarOrders}) {
    const similarOrdersRow = similarOrders.map(
        (eachOrder) => <SimilarItems key={eachOrder.order_id} order={eachOrder} />
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