const generateinterviewReport=require("../services/ai.service")
const pdfParse=require("pdf-parse")
const interviewreportModel=require("../models/interviewReport.model")


async function generateinterviewreportController(req,res){

    // const resumeFile=req.file

    const resumeContent=await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()

    const { title, selfDescription, jobDescription}=req.body

    if(!title){
        return res.status(400).json({message:"Job title is required"})
    }

    const interviewreportbyAi=await generateinterviewReport({ 
       resume: resumeContent.text,
        selfDescription,
       jobDescription,
       title});

    const interviewReport=await interviewreportModel.create({
        user:req.user.id,
        resume:resumeContent.text,
        selfDescription,
        jobDescription,
        title,
        ...interviewreportbyAi
    })

    res.status(201).json({
        message:"Interview report generated successfully",
        interviewReport
    })


}

async function getInterviewReportByIdController(req,res){

    const { interviewId } =req.params;
    const interviewReport=await interviewreportModel.findOne({ _id:interviewId, user:req.user.id })
     if(!interviewReport){
        return res.status(404).json({
            message:"not found"
        })
     }
     res.status(200).json({
        message:"Interview report fetched succesfully",
        interviewReport
     })

}

async function getAllInterviewReportsController(req,res){
    const interviewReports=await interviewreportModel.find({ user:req.user.id}).sort({ createdAt:-1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behaviouralQuestions -skillGaps -preparationPlan")

    return res.status(200).json({
        message:"Interview reports fetched successfully",
        interviewReports
    })
}

module.exports={ generateinterviewreportController, getInterviewReportByIdController, getAllInterviewReportsController }