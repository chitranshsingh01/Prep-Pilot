import React,{ useState,useRef} from 'react'
import '../style/home.scss'
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const { loading, generateReport } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()
    const navigate=useNavigate();

    const handleGenerateReport=async()=>{
        const resumeFile=resumeInputRef.current.files[0];
        const data=await generateReport({ jobDescription,selfDescription,resumeFile})
        if (data) {
            navigate(`/interview/${data._id}`);
        }
    }

    if(loading){
        return (
            <main>
                <h1>LOADING......</h1>
            </main>
        )
    }

  return (
    <main className="home"> 
    <div className="left">
        <textarea onChange={(e)=>{setJobDescription(e.target.value)}}
        name="jobDescription" id='jobDescription' placeholder='Enter job description here...'></textarea>
    </div>
    <div className="right">
        <div className="input-group">
            <label htmlFor='resume'>Upload Resume</label>
            <input ref={resumeInputRef}
             type="file" name='resume' id='resume' accept='.pdf'></input>
        </div>
        <div className="input-group">
            <label htmlFor='selfDescription'>Self Description</label>
            <textarea onChange={(e)=>{setSelfDescription(e.target.value)}}
            name='selfDescription' id='selfDescription' placeholder='Describe yourself'></textarea>
        </div>
        <div>
            <button onClick={handleGenerateReport}  className='generate-btn'>
                Generate interview Report
            </button>
        </div>
        </div>
    </main>
  )
}

export default Home
