import React,{ useEffect, useState,useRef} from 'react'
import '../style/home.scss'
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const { loading, generateReport,getReports,reports } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()
    const navigate=useNavigate();

    useEffect(() => {
        getReports();
    }, []);

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
                <h1>Loading......</h1>
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
        
       <section className='recent-reports'>
        <h2>My Recent Interview Plans</h2>
        {reports.length === 0 ? (
            <p>No interview reports found.</p>
        ) : (
        <ul className='reports-list'>
            {reports.map(report => (
                <li
                    key={report._id}
                    className='report-item'
                    onClick={() => navigate(`/interview/${report._id}`)}
                >
                    <h3>{report.title || "Untitled Position"}</h3>
                    <p className='report-meta'>
                        Generated on {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                </li>
            ))}
        </ul>
        )}
    </section>
    </main>
  )
}

export default Home
