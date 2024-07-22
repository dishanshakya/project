import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import {Header, ago} from './App'
import { useEffect, useState } from 'react';
import { checkTokenValidity } from './utils';

export default function ItemView() {
    const data = useLoaderData();
    return (
        <div id="itemView" className={data.order.type}>
            <Header />
            <div id="imageSeller">
                <ItemImage image={data.order.img_src} />
                <div id='itemPrice'>Rs. {data.order.price}</div>
                <OrderOwner owner={data.order}/>
            </div>
            <div id="properties">
                <div id="itemName">
                    <div style={{backgroundColor: data.order.order_type == 'sell' ? 'red': 'blue',
                        color: 'white',
                        textTransform: 'uppercase',
                        borderRadius: '10px',
                        padding: '10px',
                        fontSize: '20px',
                        alignSelf: 'end'
                    }}>{data.order.order_type}</div>
                    {data.order.product_name}
                </div>
                <Description description={data.order.description}/>
                <CommentBox ordercomments={data}/>
            </div>
            <SimilarItemsTray similarOrders={data.similar}/>
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

const data = {text: 'price kati ho bro \n fuck you bro\nniggas',
    replies: [{text: '100 rupe'}, {text: 'mango bho'}]
}
function CommentBox({ordercomments}) {
    const data = ordercomments.comments
    const comments = data.map((eachComment) => <Comment key={eachComment.comment_id} comment={eachComment} />)
    return (
        <div id='commenttray'>
            <div style={{fontSize: '20px', fontWeight: 'bold'}}>
                Comments
            </div>
            <div id="commentbox">
                {data.length ?
                comments
                : 'No comments found'}
            </div>
            <CommentWriteField type={'comments'} parentcomment={null} order={ordercomments.order}/>
        </div>
    )
}
function CommentWriteField({type, parentcomment, order}) {
    const [text, setText] = useState('')
    const [user, setUser] = useState(0)
    const navigate = useNavigate()
    
    useEffect(() => {
        checkTokenValidity((response) => {
                setUser(response.user_id)
        })
        
    }, [])
    return ( !user ? <div>Login to comment or reply</div> :
        <form id='writecomment' className='flexbox-center-aligned'
            style={{padding: '10px',
                width: '100%'
            }}
            onSubmit={async (e)=> {
                e.preventDefault()
                const response = await fetch(`http://localhost:4000/api/v1/order/${type}`, {
                    method: "POST",
                    credentials: 'include',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        order_id: order.order_id,
                        text: text,
                        comment_id: parentcomment
                    })
                })
                if (response.status == 200) {
                    navigate(`/orders/${order.order_id}`)
                    setText('')
                }

            }}
        >
            <input className='round-input' style={{width: '90%'}} 
                placeholder={`Write ${type}...`}
                onChange={(e)=> setText(e.target.value)}
                name='commentfield'
                value={text}
            ></input>
            <button type='submit' className='no-border-bgcolor img-holder' style={{height: '35px', width: '35px'}}>
                <img src='/images/rocket.png' style={{height: '30px', width: 'auto'}}></img>
            </button>
        </form>
    )
}

function Comment({comment}) {
    const [replies, setReplies] = useState(null)
    const [replybox, setReplybox] = useState(0)
    return (
        <div id='comment'>
            <div id='profileimage' className='img-holder'>
                <img src={comment.profile_pic_src} style={{height: '30px', width: 'auto'}}></img>
            </div>
            <div id='text'>
                <div id='userid'>{comment.username}</div>
                <div id='commenttext'>{comment.text}</div>
                <div id='replyicons'>
                    <div style={{fontSize: '10px', color: 'grey', marginRight: '10px'}}>
                        {ago(Date.now()-Date.parse(comment.date))}
                    </div>
                    {!comment.reply_id ? 
                    <img src='/images/reply.png' 
                        style={{height: '15px', width: 'auto', cursor: 'pointer'}} 
                        onClick={()=> setReplybox(!replybox)}
                    /> : '' }
                    {comment.replies ? 
                    <div onClick={async ()=> {
                        const response = await fetch(`http://localhost:4000/api/v1/order/replies/${comment.comment_id}`)
                        const data = await response.json()
                        if (!replies)
                            setReplies(data.map((reply) => <Comment key={reply.reply_id} comment={reply} />))
                        else setReplies(null)
                    }}
                        style={{fontSize: '12px', cursor: 'pointer', color: 'grey', marginTop: '5px', textIndent: '40px'}}
                    >
                        View replies
                    </div> : ''}
                </div>
                    {replybox?<CommentWriteField type={'replies'} parentcomment={comment.comment_id} order={comment}/>: ''}
                <div id='replies'>
                    {replies}
                </div>
            </div>
       </div>
    )
}

function  SimilarItems ({order}) {
    return (
            <Link to={`/orders/${order.order_id}`} id='similarItem'>
                <div id='similarItemPhotoHolder'>
                    <img src={order.img_src} id='similarItemPhoto'/>
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
            <div id='ownerKey'>
                Name: <br/>
                Location: <br/>
                Contact No.: <br/>
                Category: <br/>
            </div>
            <div id='ownerValue'>
                {owner.username}<br/>
                {owner.location}<br/>
                {owner.contact}<br/>
                {owner.category_name}<br/>
            </div>
        </div>
    )
}