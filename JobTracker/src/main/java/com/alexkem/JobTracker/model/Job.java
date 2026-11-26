package com.alexkem.JobTracker.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;


//Tells Spring Boot that the Job class is an Entity.
@Entity
@Table(name = "Jobs") //Explicitly names the Table "Jobs"
public class Job {

    @Id //Tells Spring the jobId is an ID
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Generates a value for every Job that is created
    @Column(name = "job_Id") //Column name is "job_id"
    private Integer jobId;

    @NotBlank(message = "Company is required") //Makes sure Company is not blank
    @Column(name = "company", nullable = false) //Creates a column named "company" and cannot be null
    private String company;

    @NotBlank(message = "Position is required") //Position cannot be null
    @Column(name = "position", nullable = false) //Column named "position" and cannot be null
    private String position;

    @NotBlank(message = "Status is required") //Status cannot be null
    @Column(name = "status", nullable = false) //Column named "status" and cannot be null
    private String status;

    @Column(name = "date_Applied", nullable = false) //Column is named "date_applied" and cannot be null
    private LocalDateTime dateApplied;

    @Column(name = "url") //Column name is "url" and can be null
    private String url;

    //Creates an empty job constructor
    public Job(){

    }

    //Creates a Job constructor created with each parameter
    public Job(Integer jobId, String company, String position, String status, LocalDateTime dateApplied, String url) {
        this.jobId = jobId;
        this.company = company;
        this.position = position;
        this.status = status;
        this.dateApplied = dateApplied;
        this.url = url;
    }

    //Job getter methods
    public Integer getJobId() {
        return jobId;
    }

    public void setJobId(Integer jobId) {
        this.jobId = jobId;
    }

    public String getCompany() {
        return company;
    }

    public String getPosition() {
        return position;
    }

    public String getStatus() {
        return status;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public LocalDateTime getDateApplied() {
        return dateApplied;
    }

    //Job setter methods
    public void setPosition(String position) {
        this.position = position;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setDateApplied(LocalDateTime dateApplied) {
        this.dateApplied = dateApplied;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
