import { generateInterviewReport,getAllinterviewReports,getInterviewREportById} from "../services/Interview.api"
import { useContext } from "react"
import { InterviewContext } from "../interview.context"

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
            setreports(response.interviewReports)
        }catch(err){
            console.log(err)
        }finally{
            setloading(false);
        }
        return response?.interviewReports ?? []

    }
    return { loading,setloading,report,setreport,reports,setreports,generateReport, getReportById, getReports};
}