export const updateLocalPatientIHistoty = (patientInformation) => {

    // Fetch the existing patients from localStorage
    const patients = JSON.parse(localStorage.getItem("patients")) || [];
    // const patientInformation = state[state.length - 1];
    const patientIndex = patients.findIndex(patient => patient.id === patientInformation.id);

    if (patientIndex === -1) {
        // If the patient does not exist, create a new patient entry
        const newPatient = {
            id: patientInformation.id,
            sex: patientInformation.sex,
            errorThreshold: patientInformation.errorThreshold,
            result: [{
                date: new Date().toISOString().split('T')[0],
                photo: patientInformation.photo,
                htmlId: patientInformation.htmlId
            }],
        };

        patients.push(newPatient);
        localStorage.setItem("patients", JSON.stringify(patients));

    } else {
        // If the patient exists, update the results
        patients[patientIndex] = {
            ...patients[patientIndex],
            result: [
                ...patients[patientIndex].result,
                {
                    date: new Date().toISOString().split('T')[0],
                    photo: patientInformation.photo,
                    htmlId: patients[patientIndex].result.length
                }
            ]
        };
        localStorage.setItem("patients", JSON.stringify(patients));
    }
}

