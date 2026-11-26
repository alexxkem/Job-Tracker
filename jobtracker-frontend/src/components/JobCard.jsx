import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import '../styles/JobCard.css';

//Job Card Function
function JobCard() {

    //Variables
    const { jobId } = useParams() //Gets the parameter job ID when editing it's form
    const API = `http://localhost:8080/applications/${jobId}`; //Gets the API along with the job ID parameter
    const navigate = useNavigate(); //Gets navigation for the next route

    //Creates a useState for jobData and setJobData
    const [jobData, setJobData] = useState(null);
    const [error, setError] = useState("");

    //Sends a request to the server for the data and sets it in the Page
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

            //Sets the Job data when it recieves it
            setJobData(data);
    
        } catch (error){ //Catches error and prints it to the log and gives an error message
            console.error(error);
            setError("Failed to retrieve Applications. Please try again.");
        }
    };
    
    //Invokes loadApplication using useEffect
    useEffect(() => {
    loadApplications();
    }, []);
    
    //Asynchronous function that handles the Deletion of a Job
    async function handleDelete(){
        const isConfirmed = window.confirm("Are you sure you want to delete this Application?"); //Pop-up to check if the user actually wants to delete the Job
        
        //If that is true then Delete the Job
        if(isConfirmed){
            try {
                
                //Fetches the response from the API with the method Delete
                const response = await fetch((API),
                {
                    method: "DELETE"
                }
                );
            
                //If response it not OK then throw an Error
                if(!response.ok){
                    throw new Error(`Failed to Delete job: ${response.status}`);
                }
            
                //Go back to the main page after submission
                navigate("/");
            } catch (error){ //Catches error and prints it to the log and gives an error message
                console.error(error);
                setError("Failed to Delete Application. Please try again.");
            }
        }
    }

    //If there an error and Job Data is null then show this error
    if(error && jobData == null){
        return <p className='error-message'>{error}</p>
    }

    //If Job Data is null while it loads then show this
    if (jobData == null) {
        return <p>Loading application...</p>;
    }


    return (
        <>
        <section className="job">
                <div>
                    <h2>{jobData.company}</h2>
                </div>
            <div className="jobCardBox">
                    <div className='jobInfo'>
                        <h3>Position</h3>
                        <p>{jobData.position}</p>
                        <h3>Date Applied</h3>
                        <p>{jobData.dateApplied}</p>
                        <h3>Job Link</h3>
                        <p>{jobData.url}</p>
                        <h3>Status</h3>
                        <p>{jobData.status}</p>
                    </div>
            </div>
            
            <div className='bottomBtn'>
                <button onClick={() => navigate(`/applications/${jobId}/edit`)} className="editBtn" >Edit</button>
                <button onClick={handleDelete} className="deleteBtn">Delete</button>
            </div>
                {error && <p className='error-message'>{error}</p>}
        </section>
        </>
    )
}

export default JobCard