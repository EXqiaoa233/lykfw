import axios from "axios"
import { useAtom } from "jotai"
import { match } from "../../atom/match/match"
import { LocalMatchID } from "../../atom/localMatch/localMatch"
import { IMatchPlayer } from "../../types/imatch"
import { IconClose } from '@arco-design/web-react/icon';

import { Popover, Button, Table, Tooltip } from '@arco-design/web-react';
import { getHeroByName } from "../../data/heroes/heroMethod"
import { getItemByName } from "../../data/items/itemMethod"
import { useState } from "react"

export const LocalMatch = () => {
    const [matchdata] = useAtom(match)
    const [localMatch, setlocalMatch] = useAtom(LocalMatchID)
    
    

    const TeamTable = (props: { teamData: IMatchPlayer[] | undefined }) => {
        const [playername, setPlayername] = useState("");
        const [avatar, setavatar] = useState("");
        const columns = [
            {
                title: 'Name',
                dataIndex: 'sid',
                width: 180,
                sorter: (a: IMatchPlayer, b: IMatchPlayer) => {
                    axios.post('http://lykfw.cc:7001/player', { 'sid': a.sid }).then(
                    data => {
                        console.log('~~~~~~~~~~~~~~~');
                        console.log(data.data['lid'])
                        console.log('============');
                        const person = async () => {
                            await axios.get(`http://lykfw.cc:7001/player/info/${data.data['lid']}`).then(
                                response => {
                                    console.log('打印成功');
                                    
                                    console.log(response.data.data.response.players[0]["personaname"])
                                    console.log(response.data.data.response.players[0])
                                    setPlayername(response.data.data.response.players[0]["personaname"])
                                    setavatar(response.data.data.response.players[0]["avatar"])
                                    console.log(avatar);
                                    
                                }
                            ).catch(err => {
                                console.log('打印失败');
                                console.log(err)
                            })
                        }
                        person();
                    })
                    if (a.sid > b.sid) return 1
                    if (a.sid < b.sid) return -1
                    if (a.sid == b.sid) return 0
                    return 0
                },
                render: (_: any, records: IMatchPlayer) => (
                    
                    
                    <>
                        <div>
                            <img src={avatar} alt="player-image" />
                            <span>{playername}</span>
                        </div>
                    </>
                )

            },
            {
                title: 'SteamID',
                dataIndex: 'sid',
                width: 150,
                sorter: (a: IMatchPlayer, b: IMatchPlayer) => {
                    if (a.sid > b.sid) return 1
                    if (a.sid < b.sid) return -1
                    if (a.sid == b.sid) return 0
                    return 0
                }
            },
            {
                title: '队伍',
                dataIndex: 'teamID',
                width: 100,
                sorter: (a: IMatchPlayer, b: IMatchPlayer) => {
                    if (a.sid > b.sid) return 1
                    if (a.sid < b.sid) return -1
                    if (a.sid == b.sid) return 0
                    return 0
                },
                render: (_: any, records: IMatchPlayer) => (
                    <text>
                        {records.teamID == 2 ? '博丽' : '守矢'}
                    </text>
                )
            },
            {
                title: '英雄',
                dataIndex: 'selectedHero',
                width: 72,
                render: (_: any, records: IMatchPlayer) => (
                    // <text>
                    //     {getHeroByName(records.selectedHero)}
                    // </text>
                    <img style={{ width: 72, height: 40 }} title={getHeroByName(records.selectedHero)} src={require('../../resource/heroes/'+ records.selectedHero+'.png')}/>
                )
            },
            {
                title: '击杀',
                dataIndex: 'kills',
                width: 90,
                sorter: (a: IMatchPlayer, b: IMatchPlayer) => {
                    if (a.kills > b.kills) return 1
                    if (a.kills < b.kills) return -1
                    if (a.kills == b.kills) return 0
                    return 0
                }
            },
            {
                title: '死亡',
                dataIndex: 'deaths',
                width: 90,
                sorter: (a: IMatchPlayer, b: IMatchPlayer) => {
                    if (a.deaths > b.deaths) return 1
                    if (a.deaths < b.deaths) return -1
                    if (a.deaths == b.deaths) return 0
                    return 0
                }
            },
            {
                title: '助攻',
                dataIndex: 'assist',
                width: 90,
                sorter: (a: IMatchPlayer, b: IMatchPlayer) => {
                    if (a.assist > b.assist) return 1
                    if (a.assist < b.assist) return -1
                    if (a.assist == b.assist) return 0
                    return 0
                }
            },
            {
                title: '输出',
                dataIndex: 'damage',
                width: 90,
                sorter: (a: IMatchPlayer, b: IMatchPlayer) => {
                    if (a.damage > b.damage) return 1
                    if (a.damage < b.damage) return -1
                    if (a.damage == b.damage) return 0
                    return 0
                }
            },
            {
                title: '物品',
                dataIndex: 'items',
                width: 180,
                render: (_: any, records: IMatchPlayer) => (
                    <Popover
                        trigger='click'
                        content={
                            <span>
                                {
                                    records.items.map((v,i) => {
                                        if (i > 5) return
                                        if (v == "none") {
                                            return
                                        }
                                        return (<p>
                                            {getItemByName(v)}
                                        </p>)
                                    })
                                }
                            </span>
                        }
                    >
                        <Button type='outline'>检查理解</Button>
                    </Popover>
                )
            },
        ]
        return (
            <Table
                pagination={false}
                data={props.teamData}
                columns={columns}
            />
        )
    }


    return (
        <>
            {
                localMatch != "" &&
                <div>
                    <div>
                        <TeamTable teamData={matchdata.find(v => v.matchId == localMatch)?.players.filter(v => v.teamID == 2)} />
                        <TeamTable teamData={matchdata.find(v => v.matchId == localMatch)?.players.filter(v => v.teamID == 3)} />
                    </div>
                    <Tooltip content='关闭'>
                        <IconClose spin style={{color:"red",fontSize:30,position:"absolute" ,top:'5px',left:'97%'}} onClick={() => setlocalMatch("")}/>
                    </Tooltip>
                </div>
            }
        </>
    )
}