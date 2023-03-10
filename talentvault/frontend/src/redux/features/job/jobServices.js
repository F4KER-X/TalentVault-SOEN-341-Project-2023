import axios from "axios"


// add job
const addJob = async (formData) => {
    const response = await axios.post('/jobs', formData)
    return response.data
}


//get all jobs
const getJobs = async () => {
    const response = await axios.get('/jobs')
    return response.data
}

//delete job
const deleteJob = async (id) => {
    const response = await axios.delete('/jobs/' + id)
    return response.data
}

//get one job
const getOneJob = async (id) => {
    const response = await axios.get('/jobs/' + id)
    return response.data
}

const jobService = {
    addJob,
    getJobs,
    deleteJob,
    getOneJob
}

export default jobService
