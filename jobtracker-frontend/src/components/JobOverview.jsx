import { useEffect, useState } from 'react';
import '../styles/JobOverview.css'

//Job Overview Function
function JobOverview(){
    
    //Variables
    const API = "http://localhost:8080/applications"
    const[applications, setApplications] = useState(null); //Intializes application and set application useState to null
    const [error, setError] = useState(""); //Sets error and set Error useState to an empty string

    //Variable that loads applications asynchronously
    const loadApplications = async () => {
        
        //Try to fetch a response from the API
        try{
            const response = await fetch(API)
            
            //If response is not ok throw an error and print it.
            if(!response.ok){
                throw new Error("Could not fetch API Request", error)
            }
            
            //Stores response json in data variable
            const data = await response.json();

            //Sets the application the data that is loads
            setApplications(data);

        } catch (error){ //Catches error and prints it to the log and gives an error message
            console.log(error)
            setError("Failed to retrieve Job Overview. Please try again.");
        }
    };
    
    //Invokes loadApplication using useEffect
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
    
    //Variables
    let totalJobs = applications.length;
    let totalInterviews = applications.filter((application) => application.status === "Interview").length;
    let totalOffers = applications.filter((application) => application.status === "Offer").length;
    

    return (
        <>
        <section id='jobOverview'> 
                <h2>My Applications</h2>
                <p class="underApplicationName">Keep track of your job search in one place.</p>
                <div class="jobOverviewContainer">
                    {/* Loads total Jobs, Total Interviews, and Total Job Offers */}
                    <div class='totalJobs'>
                        <h2>{totalJobs}</h2>
                        <p>Total Jobs</p>
                    </div>
                    <div class="totalInterviews">
                        <h2>{totalInterviews}</h2>
                        <p>Interviews</p>
                    </div>
                    <div class="totalOffers">
                        <h2>{totalOffers}</h2>
                        <p>Offers</p>
                    </div>
                </div>
                {/* Shows an error if overview is unable to load */}
                {error && <p className="error-message">{error}</p>} 
        </section>
        </>
    )
}

export default JobOverview