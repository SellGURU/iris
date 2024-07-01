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

        // Fetch the existing patients from localStorage
        const patients = JSON.parse(localStorage.getItem("patients")) || [];

        if (state.length > 0) {
            const lastAddedPatient = state[state.length - 1];
            const patientIndex = patients.findIndex(patient => patient.id === lastAddedPatient.id);

            if (patientIndex === -1) {
                // If the patient does not exist, create a new patient entry
                const newPatient = {
                    id: lastAddedPatient.id,
                    sex: lastAddedPatient.sex,
                    errorThreshold: lastAddedPatient.errorThreshold,
                    result: [{
                        date: new Date().toISOString().split('T')[0],
                        photo: "",
                        htmlId: 0
                    }],
                };
                if (lastAddedPatient.id) {
                    patients.push(newPatient);
                    localStorage.setItem("patients", JSON.stringify(patients));
                }
            } else {
                // If the patient exists, update the results
                patients[patientIndex] = {
                    ...patients[patientIndex],
                    result: [
                        ...patients[patientIndex].result,
                        {
                            date: new Date().toISOString().split('T')[0],
                            photo: lastAddedPatient.photo,
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
