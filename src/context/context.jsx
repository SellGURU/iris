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
        dispatch({type: "ADD_PATIENT", payload: patient});
    };
    // useEffect(() => console.log(state), [state]);
    useEffect(() => {
        console.log(state)
        const patients = JSON.parse(localStorage.getItem("patients")) || [];
//         for first run
if (state.length > 0) {
    const patientIndex = patients.findIndex(patient => Number(patient.id) === state[state.length - 1].id);
    if (patientIndex === -1) {
        // If the patient does not exist, create the new patient
        const newPatient = {
            id: state[state.length - 1].id,
            sex: state[state.length - 1].sex,
            errorThreshold: state[state.length - 1].errorThreshold
            ,
            result: [{
                date: new Date().toISOString().split('T')[0],
                photo: "",
                htmlId: 0
            }],
        };
        if (state[state.length - 1].id) {
            patients.push(newPatient);
            localStorage.setItem("patients", JSON.stringify(patients));
        }

    } else {
        patients[patientIndex] = {
            ...patients[patientIndex],
            result: [
                ...patients[patientIndex].result,
                {
                    date: new Date().toISOString().split('T')[0],
                    photo: state[state.length - 1].photo,
                    htmlId: patients[patientIndex].result.length
                }
            ]
        };
        localStorage.setItem("patients", JSON.stringify(patients));
    }
}
    }, [state]);
    return (
        <PatientContext.Provider value={{patients: state, addPatient}}>
            {children}
        </PatientContext.Provider>
    );
};
[]