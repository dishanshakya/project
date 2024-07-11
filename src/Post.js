import { useRef, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

export default function PostItem() {
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [contact, setContact] = useState('')
    const [file, setFile] = useState()
    const [description, setDescription] = useState('')
    const [itemName, setItemName] = useState('')
    const [orderType, setOrderType] = useState('sell')
    const [price, setPrice] = useState()
    const navigate = useNavigate()

    return (
        <form id="itemView"
            onSubmit={async (e)=> {
                e.preventDefault()
                const formdata = new FormData()
                formdata.append('product_name', itemName)
                formdata.append('location', location)
                formdata.append('contact', contact)
                formdata.append('file', file)
                formdata.append('description', description)
                formdata.append('order_type', orderType)
                formdata.append('price', price)

                const response = await fetch('http://localhost:4000/api/v1/order/postorder', {
                    method: "POST",
                    body: formdata
                })
                if(response.status == 200)
                {
                    console.log('success')
                    navigate('/')
                }
            }}
        >
            <div id="placeAnOrder">Place an order</div>
            <span id="sell">Sell</span>
            <label id="switch">
                <input id="switchCheckbox" type="checkbox" 
                    onChange={(e)=>setOrderType(e.target.checked ? 'buy' : 'sell')}
                />
                <div id="slider"></div>
            </label>
            <span id="buy">Buy</span>
            <div id="imageSeller">
                <ItemImage setFile={setFile}/>
                <label id="itemPrice">
                    Rs. 
                    <input id="itemPrice" placeholder="Price" value={price}
                        onChange={(e)=> setPrice(e.target.value)}
                    />
                </label>
                <OrderOwner name={name} location={location}
                    contact={contact} setName={setName}
                    setLocation={setLocation} setContact={setContact}
                />
            </div>
            <div id="properties">
                <input id="itemName" placeholder='Item name' value={itemName}
                    onChange={(e)=>setItemName(e.target.value)}
                />
                <Description description={description} setDescription={setDescription}/>
                <button type="submit" id="placeorder">Place Order</button>
            </div>
        </form>
    );
}

function ItemImage({setFile}){
    const fileInput = useRef();
    const [uploadFileSrc, setUploadFileSrc] = useState('/images/uploadimg.jpg')

    function uploadHandle(event) {
        setUploadFileSrc(URL.createObjectURL(event.target.files[0]))
        setFile(event.target.files[0])
    }
    return (
        <div id="itemImage">
            <label id="fileupload">
                <input ref={fileInput} id="test" type='file'
                placeholder='Upload Photo' onChange={uploadHandle}/>
                <img src={uploadFileSrc} />
            </label>
        </div>
    )
}
function Description({description, setDescription}) {
    return (
        <textarea id="description" placeholder='Description...' value={description}
            onChange={(e)=> setDescription(e.target.value)}
        >
        </textarea>
    )
}

function OrderOwner({name, setName, location, setLocation, contact, setContact}) {
    return (
        <div id="orderOwner">
            <div id='ownerKey'>
                Seller Name: <br/>
                Location: <br/>
                Contact No.: <br/>
            </div>
            <div id='ownerValue'>
                <input value={name} placeholder="[Name]" required
                onChange={(e)=>setName(e.target.value)}/><br/>
                <input value={location} placeholder="[Location]" required
                onChange={(e)=>setLocation(e.target.value)}/><br/>
                <input value={contact} placeholder="[Contact]" required
                onChange={(e)=>setContact(e.target.value)}/><br/>
            </div>
        </div>
    )
}