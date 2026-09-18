const express=require("express");
const authMiddleware=require("../middlewares/auth.middleware");
const interviewController=require("../controllers/interview.controller")
const upload=require("../middlewares/file.middleware")

const interviewRouter=express.Router();

/** 
 * @route POST /api/interview
 * @description generate new report on basis of resume,job and self description
 * 
*/
interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateinterviewreportController)

/**
 * @route GET/api/intrview:/report/interviewId
 * @description get interview report by id
 */

interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.getInterviewReportByIdController)

/**
 * @route GET /api/interview
 * @description get all report of user 
 * @access private
 */

interviewRouter.get("/",authMiddleware.authUser,interviewController.getAllInterviewReportsController)






module.exports=interviewRouter;
 