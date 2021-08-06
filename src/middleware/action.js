import axios from "axios";
export const GET_USER_LIST = "GET_USER_LIST";
export const EDIT_LANG = "EDIT_LANG";
export const EDIT_AUTHORIZATION = "EDIT_AUTHORIZATION"
export const EDIT_PROPERTYS = "EDIT_PROPERTYS";
export const EDIT_COLOR = "EDIT_COLOR";
export const EDIT_COMPWIDTH = "EDIT_COMPWIDTH";
export const EDIT_COMPONENT = "EDIT_COMPONENT";
export const EDIT_DARKMODE = "EDIT_DARKMODE";
export const EDIT_PROPERTY = "EDIT_DARKMODE";

export const editAuth = (auth) => {
    return (dispatch) => {

        console.log("edit auth", auth);
        dispatch({
            type: EDIT_AUTHORIZATION,
            payload: auth,
        });

    };
};

export const editLang = (lang) => {
    return (dispatch) => {

        console.log("edit lang", lang);
        dispatch({
            type: EDIT_LANG,
            payload: lang,
        });

    };
};

export const delUser = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:80/users/${id}`).then((res) => {
            console.log(res);
            dispatch({
                type: "DEL_USER",
                payload: res.data.id,
            });
        });
    };
};

export const addUser = (data) => {
    return (dispatch) => {
        axios.post("http://localhost:80/users", data).then((res) => {
            console.log(res);
            dispatch({
                type: "ADD_USER",
                payload: res.data,
            });
        });
    };
};

export const editUser = (data) => {
    return (dispatch) => {
        axios.put(`http://localhost:80/users/${data.id}`, data).then((res) => {
            console.log(res);
            dispatch({
                type: "EDIT_USER",
                payload: res.data,
            });
        });
    };
};


export const getUser = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:80/users/${id}`).then(() => {
            dispatch({
                type: "GET_USER",
                payload: id,
            });
        });
    };
};

export const getUserList = () => {
    // return (dispatch) => {
    //   console.log("getUserList");
    // axios.get("http://localhost:80/users").then((res) => {
    //   console.log("getUserList",res.data);
    //   dispatch({
    //     type: "GET_USER_LIST",
    //     payload: res.data,
    //   });
    // });
    // dispatch({
    return {
        type: GET_USER_LIST,
        payload: [{
                name: "Harry Potter",
                id: "London",
                email: "https://email.sistacafe.com/emails/uploads/summary/email/54688/301386_full1.jpg",
            },
            {
                name: "Dumbledore",
                id: "Madrid",
                email: "https://emails.immediate.co.uk/production/volatile/sites/3/2017/10/dumbledore-c475b3b.jpg?quality=90&resize=768,574",
            },
            {
                name: "Hermione",
                id: "Paris",
                email: "http://img.sparknotes.com/content/sparklife/sparktalk/madhermionefacemain_LargeWide.jpg",
            },
            {
                name: "Dobby",
                id: "Alabama",
                email: "https://hips.hearstapps.com/cosmouk.cdnds.net/16/04/480x240/landscape-1454269366-dobbysmcosmopolitanuk.png?resize=480:*",
            },
            {
                name: "McGonagall",
                id: "Paris",
                email: "https://www.looper.com/img/gallery/professor-mcgonagalls-entire-backstory-explained/intro-1582830670.jpg",
            },
            {
                name: "Ron Weasley",
                id: "Alabama",
                email: "data:email/jpeg;base64,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",
            },
        ]
    }

};