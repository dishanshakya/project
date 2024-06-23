import {Header} from './App'

export default function PostItem() {
    return (
        <div id="itemView">
            <Header />
            <div id="imageSeller">
                <ItemImage />
                <OrderOwner />
            </div>
            <div id="properties">
                <input id="itemName" placeholder='Item name' />
                <Description />
            </div>
        </div>
    );
}

function ItemImage(){
    return (
        <div id="itemImage">
            <input type='file' placeholder='Upload Photo' />
        </div>
    )
}
function Description() {
    return (
        <input id="description">
        </input>
    )
}

function OrderOwner({owner}) {
    return (
        <div id="orderOwner">
            {owner}
        </div>
    )
}