import { useState } from 'react';

export default function useProperty() {
    



    const [property, setProperty] = useState(null);

    // const getProperty = () => {
    //     // const tokenString = sessionStorage.getItem('token');
    //     // const userToken = JSON.parse(tokenString);
    //     return property;
    // };

    const saveProperty = propertyString => {

        // console.log("propertyString", propertyString)
        setProperty(propertyString);

    };

    return {
        setProperty: saveProperty,
        property
    }
}


// import React, { useState, useContext } from "react";
// import { ReactReduxContext,useDispatch } from 'react-redux'
// import {
//     EDIT_PROPERTY
// } from "./action";

// import {
//     EDIT_PERMISSION
// } from "./action";

// import propertypermission from "../services/propertypermission.service";
// import propertyrole from "../services/propertyrole.service"
// import { permission,editproperty } from "./action";

// export default function useProperty() {
//     const dispatch = useDispatch();
//     console.log("selectedProperty1",JSON.parse(sessionStorage.getItem("grantproperty"))[0].propertycode);
//     const  {store}  = useContext(ReactReduxContext);
//     console.log("selectedProperty2",store);
// const [selectedProperty, setSelectedProperty] = useState(JSON.parse(sessionStorage.getItem("grantproperty"))[0].propertycode);
   
//     console.log("selectedProperty");

//     // const getProperty = () => {
//     //     // const tokenString = sessionStorage.getItem('token');
//     //     // const userToken = JSON.parse(tokenString);
//     //     return property;
//     // };



//     const handleSelect = async () => {
//         const permission = await propertypermission(sessionStorage.getItem("auth"), selectedProperty);
//         console.log("permission", permission)

//      dispatch(permission(permission.content[permission.content.length - 1]));




//         const role = await propertyrole(sessionStorage.getItem("auth"), selectedProperty);
//         sessionStorage.setItem("role", role.content[role.content.length - 1]);
//         // const menu = await menus(sessionStorage.getItem("auth"),selectedProperty);
//         // sessionStorage.setItem('comp', JSON.stringify(menu.content.components));
//         store.dispatch(editproperty(selectedProperty));
//         sessionStorage.setItem('property', selectedProperty);
//         // setProperty(selectedProperty);
//         return selectedProperty;


//     };

//     const [property, setProperty] = useState(handleSelect());

//     const saveProperty = permission => {

//         console.log("propertyString", permission)
//         setProperty(permission);
        
//         const permissions = permission;
//         console.log("permissions", permissions)
//         if (permissions != null) {
//             setProperty(permissions);
            
//         }




//     };

//     return {
//         setProperty: saveProperty,
//         property
//     }
// }

