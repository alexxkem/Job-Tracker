package com.alexkem.JobTracker.Controller;

import com.alexkem.JobTracker.model.Job;
import com.alexkem.JobTracker.Service.JobService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

//Connects backend to front end explicitly stated by Cross Origins
@CrossOrigin(origins = "http://localhost:5173")
@RestController //Spring Annotation that knows this is the Rest Controller
@RequestMapping("/")  //The request gets handle to '/' in the backend

//Job Controller
public class JobController {

    @Autowired //Injects a bean that connects from the JobService through Dependency Injection.
    JobService service;

    //Retrieves all the Jobs
    @GetMapping("/applications")
    public List<Job> getJobList(){
        return service.getJobList().reversed();
    }

    //Retrieves Jobs by id
    @GetMapping("/applications/{jobId}")
    public Job getById(@PathVariable Integer jobId){
        return service.getById(jobId);
    }

    //Accept and Post a new Job
    @PostMapping("/applications")
    public void addApplication(@Valid @RequestBody Job job){
        service.addApplication(job);
    }

    //Updates an existing Job
    @PutMapping("/applications/{jobId}")
    public void updateApplication(@PathVariable Integer jobId, @Valid @RequestBody Job job){
        service.updateApplication(jobId, job);
    }

    //Deletes an existing Job
    @DeleteMapping("/applications/{jobId}")
    public void deleteApplications(@PathVariable Integer jobId){
        service.deleteApplication(jobId);
    }


}
