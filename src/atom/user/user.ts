import {atom, useAtom} from 'jotai'
import { IUser } from '../../types/iuser'
import { IMatch } from '../../types/imatch'


export const sid = atom<string>('')


export const user = atom<any>('')