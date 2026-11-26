import { useEffect, useState } from 'react'
import { Link } from 'react-router';
import '../styles/JobList.css';

//Job List Function
function JobList() {
    
    //Variables
    const API = "http://localhost:8080/applications"; //Sets API to the localhost endpoint
    const [applications, setApplications] = useState(null); //Intializes the application and setApplcation to useState of null
    const [error, setError] = useState(""); //Initializes the error and setError useState to empty string

    //Variable that loads applications asynchronously
    const loadApplications = async () => {

        //Try to fetch a response from the API
        try {
            const response = await fetch(API);
            
            //If response is not ok throw an error and print it.
            if(!response.ok){
                throw new Error("Backend returned an error");
            }
            
            //Stores response json in data variable
            const data = await response.json();

            //Sets the application the data that is loads
            setApplications(data);
            
        } catch (error){ //Catches error and prints it to the log and gives an error message
            console.error(error);
            setError("Failed to retrieve Applications. Please try again.");
        }
    };
    
    //Invokes loadApplication useEffect
    useEffect(() => {
        loadApplications();
    }, []);

    //If there is an error and if applications is not null set an error on the screen
    if(error && applications == null){
        return <p className='error-message'>{error}</p>
    }
    
    //If application is null load application until there is a response or error
    if (applications == null) {
        return <p>Loading application...</p>;
    }
    
    //Caps the amount of Jobs in the List
    const maxItems = 6;
    const visibleItems = applications.slice(0, maxItems);

    return (
        <>
        <section id="jobList">
            <div className="jobBox">
                <div className="boxTitle">
                    <h2>Recent applications</h2>
                    {/* Shows only the first 6 applications that was recent created */}
                    {(applications.length > 6) && <Link className="jobViewAll" to={'/applications/all'}>View All</Link>}
                </div>
                <div>
                    {/* If there are no applications shows this on the screen */}
                    {(applications.length === 0) && <p className='noApplication'>No applications.</p>}

                    {/* Maps each job with it's correct details */}
                    {visibleItems.map((job) => (
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
                {/* Shows and error message if there is an error */}
                {error && <p className="error-message">{error}</p>}
            </div>
        </section>
        </>
    )
}

export default JobList