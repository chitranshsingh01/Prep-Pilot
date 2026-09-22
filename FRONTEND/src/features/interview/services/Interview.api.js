import axios from "axios"


const api=axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true,
})


/**
 * @description service to get interview report based on user self description , job amd reume
 */
export const generateInterviewReport= async({ title, jobDescription ,selfDescription,resumeFile })=>{

    const formData=new FormData();
    formData.append("title",title);
    formData.append("jobDescription",jobDescription);
    formData.append("selfDescription",selfDescription);
    formData.append("resume",resumeFile);

    const response = await api.post("/api/interview" ,formData,{
        headers:{
            "Content-Type":"multipart/form-data"

        }
    })

    return response.data;
}



/**
 * @description to get interview report by id
 */

export const getInterviewREportById=async(interviewId)=>{
    const response= await api.get(`/api/interview/report/${interviewId}`)

    return response.data
}


/**
 * 
 * @description to get all reports of user 
 */

export const getAllinterviewReports=async()=>{
    const response=await api.get("/api/interview/");

    return response.data;

}

/**
 * 
 * @description to genrate resume pdf  
 */


export const generateResumePdf=async(interviewId)=>{

    const response =await api.post(`/api/interview/resume/pdf/${interviewId}`,null,{
        responseType:"blob"
    })
    return response.data;
}