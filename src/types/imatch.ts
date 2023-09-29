export interface IMatch {
    matchId: string
    matchTime: string
    winner: number
    createDate:Date
    players: IMatchPlayer[]
}

export interface IMatchPlayer {
    playerID: number
    sid: string
    teamID: number
    kills: number
    deaths: number
    assist: number
    selectedHero: string
    items: string[]
    damage: number
}

export interface IMatchData {
    key:string
    matchId: string
    matchTime: string
    matchDate:Date
    iswinner: string
    selectedHero: string | undefined
    kills: number | undefined
    deaths: number | undefined
    assist: number | undefined
    damage: number | undefined
}