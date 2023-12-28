import Table from "../../component/table"

// 创建一个可以增删改查的表格

export const Query = () => {
    
    return (
        <div>
            <h1>Query</h1>
            <div style={{ position: "fixed" ,top:'100px',left:'0px'}}><Table /></div>
        </div>
    )
}