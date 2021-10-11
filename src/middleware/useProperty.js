import { useState } from 'react';

export default function useProperty() {
    



    const [property, setProperty] = useState(null);

    // const getProperty = () => {
    //     const tokenString = sessionStorage.getItem('token');
    //     const userToken = JSON.parse(tokenString);
    //     return property;
    // };

    const saveProperty = propertyString => {

        console.log("propertyString", propertyString)
        setProperty(propertyString);

    };

    return {
        setProperty: saveProperty,
        property
    }
}



// import { useState,useContext } from 'react';
// import { ReactReduxContext } from 'react-redux'
// import propertypermission from "../services/propertypermission.service";
// import propertyrole from "../services/propertyrole.service"
// import {
//     EDIT_PROPERTY
// } from "./action";

// import {
//     EDIT_PERMISSION
// } from "./action";

// export default function useProperty() {
//     console.log("permission")
//     const { store } = useContext(ReactReduxContext);

//     const [property, setProperty] = useState(getProperty());

//     const getProperty = async () => {
//         const sessionproperty = sessionStorage.getItem('property');
//         const permission = await propertypermission(sessionStorage.getItem("auth"), sessionproperty);
//         console.log("permission", permission)
//         store.dispatch({
//             type: EDIT_PERMISSION,
//             payload: permission.content[permission.content.length - 1],
//         });

     
//         store.dispatch({
//             type: EDIT_PROPERTY,
//             payload: sessionproperty,
//         });
//         return sessionproperty;
//     };

 

//     const saveProperty = sessionproperty => {


//         const property = sessionproperty;
//         console.log("property", property)
//         if (property != null) {
        
//                 setProperty(property);
            
//         }

//     };

//     return {
//         setProperty: saveProperty,
//         property
//     }
// }

