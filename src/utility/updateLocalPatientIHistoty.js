export const updateLocalPatientIHistoty = (patientInformation) => {

    // Fetch the existing patients from localStorage
    console.log(patientInformation)
    const patients = JSON.parse(localStorage.getItem("patients")) || [];
    // const patientInformation = state[state.length - 1];
    console.log(patients)
    const patientIndex = patients.findIndex(patient => Number(patient.id) == patientInformation.id);
    const date = new Date();
    console.log(patientIndex)
    if (patientIndex === -1) {
        // If the patient does not exist, create a new patient entry
        let newPatient;

        if(patientInformation.htmlId != ''){
            newPatient = {
                id: patientInformation.id,
                sex: patientInformation.sex,
                errorThreshold: patientInformation.errorThreshold,
                firstName:patients[patientIndex].firstName,
                lastName:patients[patientIndex].lastName,
                email:patients[patientIndex].email,
                phone:patients[patientIndex].phone,                
                comment:[],
                result: [{
                    date: date.getDate()+"   "+date.toLocaleString('default', { month: 'long' })+"   "+date.getFullYear(),
                    photo: patientInformation.photo,
                    htmlId: patientInformation.htmlId
                }],
            };
        }else{
            newPatient = {
                id: patientInformation.id,
                sex: patientInformation.sex,
                errorThreshold: patientInformation.errorThreshold,
                firstName:patientInformation.firstName,
                lastName:patientInformation.lastName,
                email:patientInformation.email,
                phone:patientInformation.phone,                  
                comment:[],
                result: [],                
            };
        }

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
                    htmlId: patients[patientIndex].result.length,
                    imageMode:patientInformation.imageMode
                }
            ]
        };
        localStorage.setItem("patients", JSON.stringify(patients));
    }
}

