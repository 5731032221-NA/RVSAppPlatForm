import React from 'react'

function Test2(props) {
    React.useEffect(() => {
        console.log("props.Data2:",props.Datachile);
    },[])
    return (
        <div>
            {/* {props.Datachile} */}
        </div>
    )
}

export default Test2
