import React from 'react'

const Home = () => {
    return (
        <main className='home'>
        <div className="interview-input-group">
            <div className="left">
                <textarea name="jobDescription" id="jobDescription" placeholder='Enter job Description here...'></textarea>

            </div>
            <div className="right">
                <div className="input-group">
                    <label htmlFor="resume">Upload Resume</label>
                    <input hidden type="file" name='resume' accept='.pdf'/>
                </div>
                <div className="input-group">
                    <label htmlFor="selfDescription">Self Description</label>
                    <textarea name="selfDescription" id="selfDescription" placeholder='Enter self Description here...'></textarea>
                </div>
                
            </div>
        </div>
        </main>
       
    )
}

export default Home