
export default function PostItem() {
    return (
        <form id="itemView">
            <span id="sell">Sell</span>
            <label id="switch">
                <input id="switchCheckbox" type="checkbox"/>
                <div id="slider"></div>
            </label>
            <span id="buy">Buy</span>
            <div id="imageSeller">
                <ItemImage />
                <OrderOwner />
            </div>
            <div id="properties">
                <input id="itemName" placeholder='Item name' />
                <Description />
                <button type="submit" id="placeorder">Place Order</button>
            </div>
        </form>
    );
}

function ItemImage(){
    return (
        <div id="itemImage">
            <label id="fileupload">
                <input type='file' placeholder='Upload Photo' />
                Upload a Photo
            </label>
        </div>
    )
}
function Description() {
    return (
        <textarea id="description" placeholder='Description...'>
        </textarea>
    )
}

function OrderOwner({owner}) {
    return (
        <div id="orderOwner">
            {owner}
        </div>
    )
}