const { GoogleGenAI }=require("@google/genai");
const { z }=require("zod");
const puppeteer = require("puppeteer");

const ai =new GoogleGenAI({
    apiKey:process.env.GOOGLE_GENAI_API_KEY
})


    const interviewReportSchema = z.object({

        matchScore:z.number().describe("A score between 0 ans 100 indicating how well the candidates profile matches the job describe"),

    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intentions and anwer too "),

    behaviouralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioural questions that can be asked in the interview along with their intention and answer"),

    skillGaps: z.array(z.object({
    skill: z.string().describe("The skill which the candidate is lacking"),
    severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e.")
    })).describe("list of skill gaps in users profile and their severity"),

    preparationPlan: z.array(z.object({
    day: z.number().describe("The day number in the preparation plan, starting from 1"),
    focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, algorithms, or system design"),
    tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan")
})).describe("A day-wise preparation plan for the candidate to follow in order to improve their skills and prepare for the interview"),
    
    title:z.string().describe("the title of the job for which the report is generated")
 
 })


 async function generateinterviewReport({ resume,selfDescription,jobDescription,title }){

    const prompt = `Generate a interview report for the candidate with following details:
    Resume:${resume}
    Self Description:${selfDescription}
    Job Title:${title}
    Job Description:${jobDescription}`


    const response=await ai.interactions.create({
        model:"gemini-3.5-flash-lite",
        input:prompt,
         response_format: {
            type: "text",
            mime_type: 'application/json',
            schema: z.toJSONSchema(interviewReportSchema)
         }
    })

     const report = JSON.parse(response.output_text);
     
    return report;
}


async function genratePdfFromHtml(htmlContent){


        const browser = await puppeteer.launch();

        const page = await browser.newPage();

    await page.setContent(htmlContent, {
        waitUntil: "networkidle0"
    });

      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true
    });
     await browser.close();

     return pdfBuffer;
}


async function genrateResumePdf({resume,selfDescription,jobDescription,title}){

    const resumepdfSchema =z.object({
        html:z.string().describe("the html content of resume that can be converted to the pdf using library function")
    });

    const prompt=`Genrate a resume for a candidate with the following details-
                   resume : ${resume},
                   selfDescription:${selfDescription},
                   jobDescription:${jobDescription},
                   the format should be a json object with a single field "html" which contains the html contentt of resume which can be converted into the pdf later
                   the resume should be for the given job description and should highlight the candidates strenght and relevant experince, HTML should be well formatted and strcutured , easy to read
                   the content of the resume should not be sound like genrated by ai and should be like a human written,
                   you can highlight the content using some colors of diffrent font style
                   `

                   const response=await ai.interactions.create({
                     model:"gemini-3.5-flash-lite",
                     input:prompt,
                     response_format:{
                        type: "text",
                        mime_type: 'application/json',
                        schema: z.toJSONSchema(resumepdfSchema)
                     }
                   })

                   const jsonContent=JSON.parse(response.output_text);

                   const pdfBuffer=await genratePdfFromHtml(jsonContent.html)
                    return pdfBuffer;

}

module.exports={generateinterviewReport ,genrateResumePdf }
