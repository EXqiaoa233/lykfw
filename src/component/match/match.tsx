import { CSSProperties, useEffect, useState } from "react"
import { IMatch, IMatchData } from "../../types/imatch"
import { useAtom } from 'jotai'
import { sid } from "../../atom/user/user"
import { IUser } from "../../types/iuser"
import { request } from "http"
import axios from "axios"
import { match } from "../../atom/match/match"
import { Button, Table,Statistic } from '@arco-design/web-react';
import { getHeroByName } from "../../data/heroes/heroMethod"
import { LocalMatchID } from "../../atom/localMatch/localMatch"
export const Match = () => {
    const [s] = useAtom(sid)
    const [matchData] = useAtom(match)
    const [localMatch,setlocalMatch] = useAtom(LocalMatchID)

    const MatchTable = (props: { matchs: IMatch[], sid: string }) => {
        let matchdata: IMatchData[] = []
        props.matchs.forEach(v => {
            // console.log(v.players.find(v => v.sid == props.sid))
            matchdata.push({
                key: v.matchId,
                matchId: v.matchId,
                matchTime: v.matchTime,
                matchDate:v.createDate,
                iswinner: v.winner == v.players.find(v => v.sid == props.sid)?.teamID ? '胜利' : '失败',
                selectedHero: <img style={{ width: 72, height: 40 }} title={getHeroByName(v.players.find(v => v.sid == props.sid)?.selectedHero)} src={require('../../resource/heroes/'+v.players.find(v => v.sid == props.sid)?.selectedHero+'.png')}/>,
                kills: v.players.find(v => v.sid == props.sid)?.kills,
                deaths: v.players.find(v => v.sid == props.sid)?.deaths,
                assist: v.players.find(v => v.sid == props.sid)?.assist,
                damage: v.players.find(v => v.sid == props.sid)?.damage
            })
        })
        matchdata.sort((a,b)=>{
            if (a.matchDate > b.matchDate) return -1
            if (a.matchDate < b.matchDate) return 1
            if (a.matchDate == b.matchDate) return 0
            return 0
        })

        const columns = [
            {
                title: '比赛编号',
                dataIndex: 'matchId',
                width:180,
                sorter: (a: IMatchData, b: IMatchData) => {
                    if (a.matchId > b.matchId) return 1
                    if (a.matchId < b.matchId) return -1
                    if (a.matchId == b.matchId) return 0
                    return 0
                }
            },
            {
                title: '比赛时长',
                dataIndex: 'matchTime',
                width:150,
                sorter: (a: IMatchData, b: IMatchData) => {
                    if (a.matchTime > b.matchTime) return 1
                    if (a.matchTime < b.matchTime) return -1
                    if (a.matchTime == b.matchTime) return 0
                    return 0
                }
            },
            {
                title: '比赛结果',
                dataIndex: 'iswinner',
                width:150,
                sorter: (a: IMatchData, b: IMatchData): number => {
                    if (a.iswinner == '胜利' && b.iswinner != '胜利') return 1
                    if (a.iswinner != '胜利' && b.iswinner == '胜利') return -1
                    return 0
                }
            },
            {
                title: '比赛日期',
                dataIndex: 'matchDate',
                width:150,
                sorter: (a: IMatchData, b: IMatchData) => {
                    if (a.matchDate > b.matchDate) return 1
                    if (a.matchDate < b.matchDate) return -1
                    if (a.matchDate == b.matchDate) return 0
                    return 0
                },
                render: (_: any, records: IMatchData) => (
                    <Statistic value={Date.parse((records.matchDate).toString())} format='YYYY/MM/DD HH:mm:ss' styleValue={{fontSize:"100%"}} />
                )
            },
            {
                title: '使用英雄',
                dataIndex: 'selectedHero',
                width:120,
            },
            {
                title: '击杀',
                dataIndex: 'kills',
                width:100,
                sorter: (a: IMatchData, b: IMatchData) => {
                    if (a.kills == undefined || b.kills == undefined) return 0
                    if (a.kills > b.kills) return -1
                    if (a.kills < b.kills) return 1
                    if (a.kills == b.kills) return 0
                    return 0
                }
            },
            {
                title: '死亡',
                dataIndex: 'deaths',
                width:100,
                sorter: (a: IMatchData, b: IMatchData) => {
                    if (a.deaths == undefined || b.deaths == undefined) return 0
                    if (a.deaths > b.deaths) return 1
                    if (a.deaths < b.deaths) return -1
                    if (a.deaths == b.deaths) return 0
                    return 0
                }
            },
            {
                title: '助攻',
                dataIndex: 'assist',
                width:100,
                sorter: (a: IMatchData, b: IMatchData) => {
                    if (a.assist == undefined || b.assist == undefined) return 0
                    if (a.assist > b.assist) return -1
                    if (a.assist < b.assist) return 1
                    if (a.assist == b.assist) return 0
                    return 0
                }
            },
            {
                title: '输出',
                dataIndex: 'damage',
                width:120,
                sorter: (a: IMatchData, b: IMatchData) => {
                    if (a.damage == undefined || b.damage == undefined) return 0
                    if (a.damage > b.damage) return -1
                    if (a.damage < b.damage) return 1
                    if (a.damage == b.damage) return 0
                    return 0
                }
            },
            {
                title: '比赛详情',
                dataIndex: 'op',
                width:150,
                render: (_: any, records: IMatchData) => (
                    <Button onClick={() => { setlocalMatch(records.matchId) }} type='primary' status='default' >
                        检查实力
                    </Button>
                )
            },
        ]
        return (
            <Table
                data={matchdata}
                columns={columns}
            />

        )
    }
    return (
        <>
            {localMatch == "" && <MatchTable matchs={matchData} sid={s} />}
        </>
    )
}