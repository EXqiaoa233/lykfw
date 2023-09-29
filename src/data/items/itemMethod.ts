import { items } from "./itemdata"

export const getItemByName = (name:string|undefined) =>{
    //@ts-ignore
    return items[name]
}