import LocalMatch from "../../component/localMatch"
import Match from "../../component/match"
import Player from "../../component/player"


export const Sapphire = () => {
    return (
        <>
            <div>
                <h1>
                    <text>hh,sb</text>
                </h1>
                <div >
                    <div style={{ position: "fixed" ,top:'100px',left:'0px'}}><Player /></div>
                    <div style={{ position: "fixed"  ,top:'100px',left:'500px'}}><Match /></div>
                    <div style={{ position: "fixed"  ,top:'100px',left:'500px'}}><LocalMatch /></div>
                </div>
            </div>
        </>
    )
}