const generateinterviewReport=require("../services/ai.service")
const pdfParse=require("pdf-parse")
const interviewreportModel=require("../models/interviewReport.model")


async function generateinterviewreportController(req,res){

    // const resumeFile=req.file

    const resumeContent=await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()

    const { selfDescription, jobDescription}=req.body

    const interviewreportbyAi=await generateinterviewReport({ 
       resume: resumeContent.text,
        selfDescription,
        jobDescription});

    const interviewReport=await interviewreportModel.create({
        user:req.user.id,
        resume:resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewreportbyAi
    })

    res.status(201).json({
        message:"Interview report generated successfully",
        interviewReport
    })


}

module.exports={ generateinterviewreportController}