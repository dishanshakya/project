import { useLoaderData, useSearchParams } from 'react-router-dom'
import { RecentItemTray, Header, Categories} from './App.js'
import { useState } from 'react'

export default function SearchPage() {
    const data = useLoaderData()
    const [orders, setOrders] = useState(data.orders)
    console.log(orders)
    const [searchParams, setSearchParams] = useSearchParams()
    return (
        <div id='homepage'>
            <Header searchField={searchParams.get('name')} user={data.user}/>
            <Categories list={data.categories} filter={{setOrders, data: data.orders}} />
            <div id="recentTrayHolder">
                <div id="recentinfo">
                    Results for '<span style={{color: 'green'}}>{searchParams.get('name')}</span>'
                </div>
                {orders ? 
                    <RecentItemTray orders={orders} />
                 : 
                    <h2 style={{justifySelf: 'center'}}>No results found!</h2>
                }
            </div>
        </div>
    )
}