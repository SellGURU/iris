import React, { createContext, useReducer, useContext, useCallback } from "react";

const initialState = {
    patients: JSON.parse(localStorage.getItem("patients")) || [],
    sex: "masculine",
    patientID: "1",
    errorThreshold: "10",
    pdf: '',
    photo: '',
    userName: ""
};

export const PatientContext = createContext(initialState);

const patientReducer = (state, action) => {
    switch (action.type) {
        case "ADD_PATIENT":
            return { ...state, patients: [...state.patients, action.payload] };
        case "SET_SEX":
            return { ...state, sex: action.payload };
        case "SET_PHOTO":
            return { ...state, photo: action.payload };
        case "SET_PATIENT_ID":
            return { ...state, patientID: action.payload };
        case "SET_ERROR_THRESHOLD":
            return { ...state, errorThreshold: action.payload };
        case "SET_PDF":
            return { ...state, pdf: action.payload };
        case "SET_USER_NAME":
            return { ...state, userName: action.payload };
        default:
            return state;
    }
};

export const PatientProvider = ({ children }) => {
    const [state, dispatch] = useReducer(patientReducer, initialState);

    const addPatient = useCallback((patient) => {
        dispatch({ type: "ADD_PATIENT", payload: patient });
    }, []);

    const setSex = useCallback((sex) => {
        dispatch({ type: "SET_SEX", payload: sex });
    }, []);

    const setPhoto = useCallback((photo) => {
        dispatch({ type: "SET_PHOTO", payload: photo });
    }, []);

    const setPatientID = useCallback((patientID) => {
        dispatch({ type: "SET_PATIENT_ID", payload: patientID });
    }, []);

    const setErrorThreshold = useCallback((errorThreshold) => {
        dispatch({ type: "SET_ERROR_THRESHOLD", payload: errorThreshold });
    }, []);

    const setPdf = useCallback((pdf) => {
        dispatch({ type: "SET_PDF", payload: pdf });
    }, []);

    const setUserName = useCallback((userName) => {
        dispatch({ type: "SET_USER_NAME", payload: userName });
    }, []);

    return (
        <PatientContext.Provider value={{
            ...state,
            addPatient,
            setSex,
            setPhoto,
            setPatientID,
            setErrorThreshold,
            setPdf,
            setUserName
        }}>
            {children}
        </PatientContext.Provider>
    );
};
