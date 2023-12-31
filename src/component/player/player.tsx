import { useState } from 'react'
import hhsb from '../../resource/hhsb.jpg'
import { useAtom } from 'jotai'
import {  sid, user } from '../../atom/user/user'
import axios from "axios"
import { IUser } from '../../types/iuser'
import { Input, List } from '@arco-design/web-react';
import { match } from '../../atom/match/match'
const InputSearch = Input.Search

export const Player = () => {
    const [s,setS] = useAtom(sid)
    const [u,setU] = useAtom(user)
    const [matchData,setMatch] = useAtom(match)

    const Button = () => {
        return (
            <InputSearch
                searchButton='Search'
                defaultValue=''
                placeholder='Enter SteamID to search'
                style={{ width: 350 }}
                onSearch={(v)=>{
                    
                    fetch(v)
                }}
            />
        )
    }

    const fetchMatch = (sid:string) => {
        axios.get('http://lykfw.cc:7001/match/user/'+sid).then(
            data => {
              
                if (data.data) {
                    console.log(data.data)
                    setMatch(data.data)
                }
            }
        ).catch(err => {
            console.log(err)
        })
    }

    const fetch = (sid:string) => {
        
        axios.post('http://lykfw.cc:7001/player', { 'sid': sid }).then(
            data => {
                console.log(data)
                setU(data.data)
                if (data.data.sid) {
                    setS(sid)
                    fetchMatch(sid)
                }

            }
        ).catch(err => {
            console.log(err)
        })
    }

    const playerInfo = () => {
        return (
            <List
                style={{ width: 350 ,textAlign:'left'}}
                size='small'
                header={'硬实力'}
                dataSource={[
                    'sid: ' + u?.sid,
                    'lid: ' + u?.lid,
                    'rank score: ' +  Math.ceil(Number(u?.rankScore)),
                    'win rate: ' + Number((u?.winRate)?.toFixed(2))*100+'%',
                    'win records: ' + u?.winRecords,
                    'match records: ' + u?.matchRecords,
                    'last login: ' + u?.updateDate.toString(),
                ]}
                render={(item, index) => <List.Item key={index}>{item}</List.Item>}
            ></List>
        )
    }


    return (
        <div style={{ width: '350px', height: '500px' }}>
            <Button />
            {u != '' && playerInfo()}
        </div>
    )
}