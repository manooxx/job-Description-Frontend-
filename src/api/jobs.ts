import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;


//All jobs
export const fetchJobsApi = async ()=>{
    const {data} = await axios.get(`${API_URL}/jobs`);
    return data;
}

export const fetchJobByIdApi = async (id: number)=> {
    const {data} = await axios.get(`${API_URL}/jobs/:${id}`);
    return data;
};

