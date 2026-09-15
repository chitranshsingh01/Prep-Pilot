const mongoose=require('mongoose');

/** 
 *  -Job description schema
 * -Resume text
 * -Self description
 * 
 * -Overall Score : number
 *              
 * 
 * 
 * =Technical questions :
 *         [{
 *            question:" ",
 *            intention: " ",
 *            answer:" "
 *            }]
 * 
 * -Behavioural question: [{
 *            question:" ",
 *            intention: " ",
 *            answer:" "
 *            }]
 * 
 * Skill gap :[{
 *              skill:[]
 *              severity :{
 *              type :String,
*               enum :["low","medium","high"]
 * 
 * }
 * 
 * }]
 * Preparation plan : {[]}
 * 
 * 
 * 
 * 
 * **/



const technicalquestionSchema=new mongoose.Schema({
    question:{
        type:String,
        required:[true,"technical question is required"]
    },
    intention:{
        type:String,
        required:[true," intention is required"]
    },
    answer:{
        type:String,
        required:[true,"answer is required"]
    }

},{
    _id:false
})




const behaviouralQuestionSchema=new mongoose.Schema({

    question:{
        type:String,
        required:[true,"behavioural question is required"]
    },
    intention:{
        type:String,
        required:[true," intention is required"]
    },
    answer:{
        type:String,
        required:[true,"answer is required"]
    }

},{
    _id:false
})




const skillgapsSchema=new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"skill is required"]
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        required:[true,"severity is required"]
    }
},{
    _id:false
})




const preparationplanSchema=new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"day is required"]
    },
    focus:{
        type:String,
        required:[true,"focus is required"]
    },
    tasks:[{
        type:String,
        required:[true,"teask is required"]
    }]
})









const interviewreportSchema =new mongoose.Schema({

    jobDescription:{
        type:String,
        required:[true,"job description is required"]
    },

    resume:{
        type:String,
    },

    selfDescription:{
        type:String
    },

    matchScore:{
        type:Number,
        min:0,
        max:100
    },

    technicalQuestions:[technicalquestionSchema],
    behaviouralQuestions:[behaviouralQuestionSchema],
    skillGaps:[skillgapsSchema],
    preparationPlan:[preparationplanSchema],

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }



},{
    timestamps:true
});

const interviewreportModel=new mongoose.model("InterviewReport",interviewreportSchema);

module.exports=interviewreportModel;

