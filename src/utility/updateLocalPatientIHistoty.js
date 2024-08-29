export const updateLocalPatientIHistoty = (patientInformation) => {

    // Fetch the existing patients from localStorage
    console.log(patientInformation)
    const patients = JSON.parse(localStorage.getItem("patients")) || [];
    // const patientInformation = state[state.length - 1];
    console.log(patients)
    const patientIndex = patients.findIndex(patient => Number(patient.client_info.clientCode) == patientInformation.id);
    const date = new Date();
    console.log(patientIndex)
    if (patientIndex === -1) {
        // If the patient does not exist, create a new patient entry
        let newPatient;

        if(patientInformation.htmlId != ''){
            newPatient = {
                client_info:{
                    clientCode:patientInformation.id,
                    email:patientInformation.email,
                    firstName:patientInformation.firstName,
                    gender:patientInformation.sex,
                    lastName:patientInformation.lastName,
                    phone:patientInformation.phone
                },              
                comments:[],
                scans: [{
                    scanId:patientInformation.htmlId,
                    timestamp:new Date().toISOString(),
                    // date: date.getDate()+"   "+date.toLocaleString('default', { month: 'long' })+"   "+date.getFullYear(),
                    // photo: patientInformation.photo,
                    // htmlId: patientInformation.htmlId
                }],
            };
        }else{
            newPatient = {
                client_info:{
                    clientCode:patientInformation.id,
                    email:patientInformation.email,
                    firstName:patientInformation.firstName,
                    gender:patientInformation.sex,
                    lastName:patientInformation.lastName,
                    phone:patientInformation.phone
                },           
                comments:[],
                scans: [],                
            };
        }

        patients.push(newPatient);
        localStorage.setItem("patients", JSON.stringify(patients));

    } else {
        // If the patient exists, update the results
        patients[patientIndex] = {
            ...patients[patientIndex],
            scans: [
                ...patients[patientIndex].scans,
                {
                    scanId:patientInformation.htmlId,
                    timestamp:new Date().toISOString(),
                }
            ]
        };
        localStorage.setItem("patients", JSON.stringify(patients));
    }
}

