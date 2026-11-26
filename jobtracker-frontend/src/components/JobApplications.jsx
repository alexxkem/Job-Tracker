import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import '../styles/JobApplications.css';

//Job Application Function
function JobApplications() {

    //Variables
    const API = "http://localhost:8080/applications";
    const [applications, setApplications] = useState(null);
    const [error, setError] = useState("");

    //Sends a request to the server for the data and loads the Applications on the page
    const loadApplications = async () => {
        try {

            //Variable that holds the response that it receives from the API
            const response = await fetch(API);
            
            //If response is not ok throw an error and print it.
            if(!response.ok){
                throw new Error("Backend returned an error");
            }
            
            //Stores response json in data variable
            const data = await response.json();

            //Sets the data when it recieves it
            setApplications(data);
    
        } catch (error){ //Catches error and prints it to the log and gives an error message
            console.error('Cannot connect to Spring Boot. Start the backend first.', error);
            setError("Failed to retrieve Applications. Please try again.");
        }
    };

    //Invokes loadApplication using useEffect
    useEffect(() => {
    loadApplications();
    }, []);

    //If there an error and Job Data is null then show this error
    if(error && applications == null){
        return <p className='error-message'>{error}</p>
    }

    //If Job Data is null while it loads then show this
    if (applications == null) {
        return <p>Loading application...</p>;
    }


    return (
        <section className="applications">
            <h2>Applications</h2>
            <div className='applicationBox'>
                {applications.map((job) => (
                    <div key={job.jobId} className="jobCard">

                        <div className="jobInfoLeft">
                            <Link className="jobTitle" to={`/applications/${job.jobId}`}>
                                <h3>{job.company}</h3>
                            </Link>
                            <p className="jobPosition">{job.position}</p>
                        </div>
                            <p className="jobStatus">{job.status}</p>
                    </div>
                ))}
            </div>
            {error && <p className="error-message">{error}</p>}
        </section>

    )
}

export default JobApplications;