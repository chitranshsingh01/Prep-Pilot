import { generateInterviewReport,generateResumePdf,getAllinterviewReports,getInterviewREportById} from "../services/Interview.api"
import { useContext } from "react"
import { InterviewContext } from "../interview.context"
import { useEffect } from "react";

export const useInterview=()=>{ 

    const context=useContext(InterviewContext);

    if(!context){
        throw new Error("useinterview must be used within an interviewprovider");
    }

    const { loading,setloading,report,setreport,reports,setreports}=context;

    const generateReport=async({title, jobDescription, selfDescription,resumeFile})=>{
        setloading(true);
        let response=null;
        try{
             response=await generateInterviewReport({title, jobDescription, selfDescription,resumeFile})
            setreport(response.interviewReport)

        }catch(err){
            console.log(err)
        }finally{
            setloading(false)
        }
        return response?.interviewReport ?? null;
    }

    const getReportById=async(interviewId)=>{
        setloading(true);
        let response=null;
        try{
             response=await getInterviewREportById(interviewId);
            setreport(response.interviewReport)
        }catch(err){
            console.log(err)
        }finally{
            setloading(false);
        }
        return response?.interviewReport ?? null
    }

    const getReports=async()=>{
        setloading(true);
        let response=null;
        try{
             response=await getAllinterviewReports();
            setreports(Array.isArray(response?.interviewReports) ? response.interviewReports : [])
        }catch(err){
            setreports([])
            console.error("Failed to fetch interview reports:", err.response?.data?.message || err.message)
        }finally{
            setloading(false);
        }
        return response?.interviewReports ?? []

    }

    const getResumePdf=async(interviewId)=>{
        setloading(true);
        let response=null;
        try{
            response =await generateResumePdf(interviewId);
            const url=window.URL.createObjectURL(new Blob([response],{type:"application/pdf"}));
            const link=document.createElement("a");
            link.href=url;
            link.setAttribute("download",`resume_${interviewId}.pdf`)
            document.body.appendChild(link);
            link.click();
        }catch(err){
            console.log(err)
        }finally{
            setloading(false);
        }
    }


    return { loading,setloading,report,setreport,reports,setreports,generateReport, getReportById, getReports , getResumePdf};
}