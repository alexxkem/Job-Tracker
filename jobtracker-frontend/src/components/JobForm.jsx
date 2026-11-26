import { useNavigate } from "react-router";
import { useState } from 'react';
import '../styles/JobForm.css';

//Job Form Function
function JobForm(){

    //Create navigate variable that is able to go to other components
    const navigate = useNavigate();
    const [error, setError] = useState(""); //Sets the error and setError to useState to empty string
    
    //Function to handle a click event to prevent it from submitting
    async function handleSubmit(event){
        event.preventDefault(); //Prevents the page from reload until the entire form is filled out
        
        //Gets the formData from the form
        const formData = new FormData(event.currentTarget); //Grabs the form data each target
        const newJob = Object.fromEntries(formData.entries()); //Grabs the new job from formData entries

        //Try to fetch a response from the API
        try {

            //Creates a response and fetechs applications with POST method as a JSON type, with it's body as a JSON as a string from the newJob
            const response = await fetch(
                "http://localhost:8080/applications",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newJob)
                }
            );
            
            //If response it not OK then throw an Error
            if(!response.ok){
                throw new Error(`Failed to save job: ${response.status}`);
            }
            
            //Go back to the main page after submission
            navigate("/");
        } catch (error){ //Catches error and prints it to the log and gives an error message
            console.error(error)
            setError("Failed to Submit Application. Please try again.");
        }
    }

    

    return(
        <>
            <section className="addJob">
                <h2>Add Job</h2>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="company">Company Name</label><br></br>
                        <input type="text" id="company" name="company" placeholder="Company Name" required></input><br></br>

                        <label htmlFor="position">Position</label><br></br>
                        <input type="text" id="position" name="position" placeholder="Position" required></input><br></br>

                        <label htmlFor="dateApplied">Date Applied</label><br></br>
                        <input type="datetime-local" id="dateApplied" name="dateApplied" required></input><br></br>

                        <label htmlFor="url">Job Positing Url</label><br></br>
                        <input type="url" id="url" name="url" placeholder="Job Posting Url"></input><br></br> 
                        
                        <input type="hidden" id="applied" value="Applied" name="status" defaultValue={"Applied"}></input>

                        <button type="submit" className="submitBtn">Submit</button>
                    </form>
                </div>
                {error && <p className="error-message">{error}</p>}
            </section>
        </>
    )
}

export default JobForm