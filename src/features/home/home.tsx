import { log } from 'console';
import thd from '../../resource/thd.png'
import axios from "axios"

export const Home = () => {
    return (
        <>
            <div>
                {/* <img src={thd} /> */}
                <img src="http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=avatarmedium&steamids=76561198072887807" alt="nothing" />
            </div>
        </>
    )
}

