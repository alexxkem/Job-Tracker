package com.alexkem.JobTracker.Service;

import com.alexkem.JobTracker.model.Job;
import com.alexkem.JobTracker.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

//Tells Spring Boot it is a service
@Service
public class JobService {

    //Injects the existing Job Repository into repo through Dependency Injection.
    @Autowired
    JobRepository repo;

    //Gets all the Job List through findAll method
    public List<Job> getJobList(){
        return repo.findAll();
    }

    //Gets the job object and saves it as a Job
    public void addApplication(Job job){
        repo.save(job);
    }

    //Gets the Job ID and returns it if found, else throws the HTTP exception with Error message
    public Job getById(Integer jobId){
        return repo.findById(jobId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job Not Found"));
    }

    //Gets the Job ID and Job Object if the ID is present set the job's ID to the current one and save the Job.
    public void updateApplication(Integer jobId, Job job){
        if(repo.findById(jobId).isPresent()){
            job.setJobId(jobId);
            repo.save(job);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Job Not Found"); //Throws exception if the Job is not found.
        }
    }

    //Deletes an application by grabbing the Job's ID.
    public void deleteApplication(Integer jobId){
        repo.deleteById(jobId);
    }
}
