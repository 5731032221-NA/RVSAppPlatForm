import { useState, useContext } from "react";
import { ReactReduxContext } from 'react-redux';
import propertypermission from "../services/propertypermission.service";
export default function useProperty() {
    

    const { store } = useContext(ReactReduxContext);

    const [property, setProperty] = useState(getProperty());

    const getProperty = async () => {
        const sessionproperty = sessionStorage.getItem('property');
        const permission = await propertypermission(sessionStorage.getItem("auth"), sessionproperty);
        console.log("permission", permission)
        store.dispatch({
            type: EDIT_PERMISSION,
            payload: permission.content[permission.content.length - 1],
        });

        const role = await propertyrole(sessionStorage.getItem("auth"), sessionproperty);
        sessionStorage.setItem("role", role.content[role.content.length - 1]);
        store.dispatch({
            type: EDIT_PROPERTY,
            payload: selectedProperty,
        });
        return sessionproperty;
    };

    const saveProperty = propertyString => {
        console.log("propertyString", propertyString)
        setProperty(propertyString);
    };

    return {
        setProperty: saveProperty,
        property
    }
}