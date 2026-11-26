import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from 'react';
import '../styles/JobEditForm.css';

//Job Edit From Function
function JobEditForm(){

    //Variables
    const { jobId } = useParams(); //Gets the parameter job ID when editing it's form
    const API = `http://localhost:8080/applications/${jobId}`; //Gets the API along with the job ID parameter
    const navigate = useNavigate(); //Gets navigation for the next route

    //Creates a useState for jobData and setJobData
    const [jobData, setJobData] = useState(null);
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

            //Sets the Job data when it recieves it
            setJobData(data);
    
        } catch (error){ //Catches error and prints it to the log and gives an error message
            console.error('Cannot connect to Spring Boot. Start the backend first.', error);
            setError("Failed to retrieve Applications. Please try again.");
        }
    };

    //Invokes loadApplication using useEffect
    useEffect(() => {
    loadApplications();
    }, []);
    
    //Asynchronous function that handles the Submission of a Job
    async function handleSumbit(event){
        event.preventDefault(); //Prevents reload of the form
        
        const formData = new FormData(event.currentTarget); //Gets the form data through the event
        const updateJob = Object.fromEntries(formData.entries()); //Updates the Job from the formData entries
        
        //Gets the response in an HTTP PUT when updating the Job
        try {
            const response = await fetch((API), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateJob) //Body includes the JSON of the update Job object
            }
            );
            
            //If response is not ok throw an error and print it.
            if(!response.ok){
                throw new Error(`Failed to Submit the Update ${response.status}`);
            }
            
            //Navigates back to the homepage when it submits
            navigate('/');
        } catch (error) { //Catches error and prints it to the log and gives an error message
            console.error(error)
            setError("Failed to Submit Application. Please try again.");
        }
    }
    
    //If there an error and Job Data is null then show this error
    if (error && jobData == null) {
        return <p className='error-message'>{error}</p>
    }

    //If Job Data is null while it loads then show this
    if (jobData == null) {
        return <p>Loading application...</p>;
    }


    return (
        <>
            <section className="editJobCard">
                <h2>Edit Job</h2>
                <form onSubmit={handleSumbit} className="editJobForm">
                    <label htmlFor="company">Company Name</label><br></br>
                    <input type="text" id="company" name="company" defaultValue={jobData.company}required></input><br></br>

                    <label htmlFor="position">Position</label><br></br>
                    <input type="text" id="position" name="position" defaultValue={jobData.position}required></input><br></br>

                    <label htmlFor="dateApplied">Date Applied</label><br></br>
                    <input type="datetime-local" id="dateApplied" name="dateApplied" defaultValue={jobData.dateApplied}required></input><br></br>

                    <label htmlFor="url">Job Positing Url</label><br></br>
                    <input type="url" id="url" name="url" defaultValue={jobData.url}></input><br></br>

                    <label>Status</label><br></br>

                    <div className="radioBtn">
                        <input type="radio" id="applied" value="Applied" name="status" defaultChecked={jobData.status === "Applied"} required></input>
                        <label htmlFor="applied" >Applied</label>

                        <input type="radio" id="interview" value="Interview" name="status" defaultChecked={jobData.status === "Interview"}></input>
                        <label htmlFor="interview" >Interview</label>

                        <input type="radio" id="denied" value="Denied" name="status" defaultChecked={jobData.status === "Denied"}></input>
                        <label htmlFor="denied" >Denied</label>

                        <input type="radio" id="offer" value="Offer" name="status" defaultChecked={jobData.status === "Offer"}></input>
                        <label htmlFor="offer" >Offer</label><br></br>

                    </div>

                    <button type="submit" className="submitBtn">Submit</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </section>
        </>
    )
}


export default JobEditForm