const { GoogleGenAI }=require("@google/genai");
const { z }=require("zod");

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
})).describe("A day-wise preparation plan for the candidate to follow in order to improve their skills and prepare for the interview")
 })


 async function generateinterviewReport({ resume,selfDescription,jobDescription }){

    const prompt = `Generate a interview report for the candidate with following details:
    Resume:${resume}
    Self Description:${selfDescription}
    Job Description${jobDescription}`


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

    // console.log(JSON.stringify(report, null, 2));
    return report;
}

module.exports=generateinterviewReport
