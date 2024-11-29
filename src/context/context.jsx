// This file defines a React context and reducer for managing patient data in a healthcare application.
// The initial state includes properties such as patients, sex, patientID, errorThreshold, pdf, fileId, photo, userName, and loadingResult.
// The PatientContext is created to provide the state and dispatch functions to any component in the component tree that needs access to the patient data.
// The patientReducer function handles various actions to update the state, such as adding a patient, setting the sex, patientID, photo, error threshold, PDF, file, userName, and loading result status.
// The PatientProvider component uses useReducer to manage the state and provides a set of callback functions to dispatch actions, allowing components to update the state in a controlled manner.
// The provider makes the state and dispatch functions available to its children components, enabling them to access and update the patient data as needed.

import React, {createContext, useReducer, useContext, useCallback} from "react";
import PackageManager from "../model/PackageManager";
import User from '../model/User';

// every time go to face mash  ,we store the data in store and fetch it when send request
export const initialState = {
    patients: JSON.parse(localStorage.getItem("patients")) || [],
    package:new PackageManager(),
    user:new User(),
    sex: "masculine",
    comment:[],
    patientID: "1",
    errorThreshold: "10",
    pdf: '',
    fileId: '',
    photo: '',
    userName: "",
    loadingResult: false,
    report:{},
    version: 1
};

export const PatientContext = createContext(initialState);

const patientReducer = (state, action) => {
    switch (action.type) {
        case "ADD_PATIENT":
            return {...state, patients: [...state.patients, action.payload]};
        case "SET_LOADING_RESULT":
            return {...state, patients: [...state.loadingResult, action.payload]};
        case "SET_SEX":
            return {...state, sex: action.payload};
        case "SET_PHOTO":
            return {...state, photo: action.payload};
        case "SET_PATIENT_ID":
            return {...state, patientID: action.payload};
        case "SET_ERROR_THRESHOLD":
            return {...state, errorThreshold: action.payload};
        case "SET_PDF":
            return {...state, pdf: action.payload};
        case "SET_USER_NAME":
            return {...state, userName: action.payload};
        case "SET_FILE":
            return {...state, fileId: action.payload};
        case "SET_REPORT":
            return {...state, report: action.payload};            
        default:
            return state;
    }
};

export const PatientProvider = ({children}) => {
    const [state, dispatch] = useReducer(patientReducer, initialState);

    const addPatient = useCallback((patient) => {
        dispatch({type: "ADD_PATIENT", payload: patient});
    }, []);
    const setLoadingResult = useCallback((loadingResult) => {
        dispatch({type: "SET_LOADING_RESULT", payload: loadingResult});
    }, []);

    const setSex = useCallback((sex) => {
        dispatch({type: "SET_SEX", payload: sex});
    }, []);

    const setPhoto = useCallback((photo) => {
        dispatch({type: "SET_PHOTO", payload: photo});
    }, []);
    const setReport = useCallback((data) => {
        dispatch({type: "SET_REPORT", payload: data});
    }, []);
    const setPatientID = useCallback((patientID) => {
        dispatch({type: "SET_PATIENT_ID", payload: patientID});
    }, []);

    const setErrorThreshold = useCallback((errorThreshold) => {
        dispatch({type: "SET_ERROR_THRESHOLD", payload: errorThreshold});
    }, []);

    const setPdf = useCallback((pdf) => {
        dispatch({type: "SET_PDF", payload: pdf});
    }, []);

    const setFile = useCallback((file) => {
        dispatch({type: "SET_FILE", payload: file});
    }, []);

    const setUserName = useCallback((userName) => {
        dispatch({type: "SET_USER_NAME", payload: userName});
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
            setFile,
            setUserName,
            setReport,
            setLoadingResult,
        }}>
            {children}
        </PatientContext.Provider>
    );
};
