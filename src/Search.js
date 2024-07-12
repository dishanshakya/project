import { useLoaderData, useSearchParams } from 'react-router-dom'
import { RecentItemTray, Header, Categories} from './App.js'

export default function SearchPage() {
    const orders = useLoaderData()
    const [searchParams, setSearchParams] = useSearchParams()
    return (
        <div id='homepage'>
            <Header searchField={searchParams.get('name')}/>
            <Categories />
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