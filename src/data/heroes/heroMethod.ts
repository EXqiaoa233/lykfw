import { heroList } from "./herodata"


export const  getHeroByName = (name:string | undefined) => {
    //@ts-ignore
    return heroList[name]
}