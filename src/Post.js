import { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Logo } from "./App";

export default function PostItem() {
    const  data = useLoaderData()
    const [location, setLocation] = useState('')
    const [contact, setContact] = useState('')
    const [file, setFile] = useState()
    const [description, setDescription] = useState('')
    const [itemName, setItemName] = useState('')
    const [orderType, setOrderType] = useState('sell')
    const [price, setPrice] = useState()
    const [category, setCategory] = useState(1)
    const navigate = useNavigate()

    useEffect(()=> {
        if(!data.user) {
            navigate('/login', {replace: true})
        }
    })

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
                formdata.append('category', category)

                const response = await fetch('http://localhost:4000/api/v1/order/postorder', {
                    method: "POST",
                    body: formdata,
                    credentials: 'include'
                })
                if(response.status == 200)
                {
                    console.log('success')
                    navigate('/')
                }
            }}
        >
            <Logo />
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
                    <input id="itemPrice" inputMode="numeric" placeholder="Price" value={price}
                        onChange={(e)=> setPrice(e.target.value)} required
                    />
                </label>
                <OrderOwner name={data.user.username} location={location}
                    contact={contact} 
                    setLocation={setLocation} setContact={setContact}
                    category={category} setCategory={setCategory}
                    categorylist={data.categories}
                />
            </div>
            <div id="properties">
                <input id="itemName" placeholder='Item name' value={itemName}
                    onChange={(e)=>setItemName(e.target.value)} required
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
                <input ref={fileInput} id="test" type='file' accept="image/*"
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

function OrderOwner({name, location, setLocation, contact, setContact, category, setCategory, categorylist}) {
    const list = categorylist.map((each)=> <option value={each.category_id}>{each.category_name}</option>)
    return (
        <div id="orderOwner">
            <div id='ownerKey'>
                Name: <br/>
                Location: <br/>
                Contact No.: <br/>
                Category: <br/>
            </div>
            <div id='ownerValue'>
                <div>{name}</div>
                <input value={location} placeholder="[Location]" required
                onChange={(e)=>setLocation(e.target.value)}/><br/>
                <input value={contact} placeholder="[Contact]" required
                onChange={(e)=>setContact(e.target.value)}/><br/>
                <select value={category} onChange={(e)=> setCategory(e.target.value)}>
                    {list}
                </select>
            </div>
        </div>
    )
}