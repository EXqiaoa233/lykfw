import { Input, List } from '@arco-design/web-react';
import axios from "axios"
const InputSearch = Input.Search
export const Table = () => {

    const Query = () => {
        return (
            <InputSearch
                searchButton='Search'
                defaultValue=''
                placeholder='输入'
                style={{ width: 350 }}
                onSearch={(v)=>{

                    fetch(v)
                }}
            />
        )
    }

    const fetch = (sid:string) => {

        console.log(sid)
        // 需要在后端库中实现
        axios.post('http://lykfw.cc:7001/player', { 'id': sid }).then(
            data => {
                console.log(data)
            }
        )
    }
    // 创建一个可以增删改查的表格
    return (
        <div>
            <h1>Table</h1>
            <Query />

        </div>
    )
}