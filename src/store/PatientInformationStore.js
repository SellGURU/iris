// src/features/patientInformation/patientInformationSlice.js
import {createSlice} from '@reduxjs/toolkit';

export const patientInformationSlice = createSlice({
    name: 'patientInformationData',
    initialState: {
        sex: "masculine",
        patientID: "1",
        errorThreshold: "10",
        pdf:'',
        photo:'',
        isShowTour:true
    },
    reducers: {
        setSex: (state, action) => {
            state.sex = action.payload;
        },
        setPhoto:(state,action) => {
            state.photo = action.payload;
        },
        setPatientID: (state, action) => {
            state.patientID = action.payload;
        },
        setErrorThreshold: (state, action) => {
            state.errorThreshold = action.payload;
        },
        setPdf:(state,action) => {
            state.pdf = action.payload
        },
        setShowTour: (state, action) => {
            state.isShowTour = action.payload;
        },
    },
});

// Selectors
export const selectSex = (state) => state.patientInformationData.sex;
export const selectPatientID = (state) => state.patientInformationData.patientID;
export const selectErrorThreshold = (state) => state.patientInformationData.errorThreshold;
export const selectPdf = (state) => state.patientInformationData.pdf
export const selectphoto = (state) => state.patientInformationData.photo
export const selectshowTour = (state) => state.patientInformationData.isShowTour
// Actions
export const {setSex,setPdf,setShowTour, setPhoto,setPatientID, setErrorThreshold} = patientInformationSlice.actions;

export default patientInformationSlice.reducer;
