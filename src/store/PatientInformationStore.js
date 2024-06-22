// src/features/patientInformation/patientInformationSlice.js
import {createSlice} from '@reduxjs/toolkit';

export const patientInformationSlice = createSlice({
    name: 'patientInformationData',
    initialState: {
        sex: "masculine",
        patientID: "1",
        errorThreshold: "10"
    },
    reducers: {
        setSex: (state, action) => {
            state.sex = action.payload;
        },
        setPatientID: (state, action) => {
            state.patientID = action.payload;
        },
        setErrorThreshold: (state, action) => {
            state.errorThreshold = action.payload;
        }
    },
});

// Selectors
export const selectSex = (state) => state.patientInformationData.sex;
export const selectPatientID = (state) => state.patientInformationData.patientID;
export const selectErrorThreshold = (state) => state.patientInformationData.errorThreshold;

// Actions
export const {setSex, setPatientID, setErrorThreshold} = patientInformationSlice.actions;

export default patientInformationSlice.reducer;
