import {configureStore} from '@reduxjs/toolkit';
import patientInformationReducer from "./PatientInformationStore.js";


export const store = configureStore({
    reducer: {
        patientInformationData: patientInformationReducer,
    },
});

export default store;
