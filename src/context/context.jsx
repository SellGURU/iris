import React, {createContext, useReducer, useEffect} from "react";

const initialState = JSON.parse(localStorage.getItem("patients")) || [];
export const PatientContext = createContext(initialState);
const patientReducer = (state, action) => {
    switch (action.type) {
        case "ADD_PATIENT":
            return [...state, action.payload];
        default:
            return state;
    }
};
export const PatientProvider = ({children}) => {
    const [state, dispatch] = useReducer(patientReducer, initialState);
    const addPatient = (patient) => {
        console.log("addPatient")
        dispatch({type: "ADD_PATIENT", payload: patient});
    };
    useEffect(() => {
        console.log("useEffect");

    }, [state]);
    return (
        <PatientContext.Provider value={{patients: state, addPatient}}>
            {children}
        </PatientContext.Provider>
    );
};
