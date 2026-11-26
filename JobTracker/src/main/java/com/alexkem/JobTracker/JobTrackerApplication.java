package com.alexkem.JobTracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//Annotate it as a Spring Boot application
@SpringBootApplication
public class JobTrackerApplication {

	//Main method that runs the Spring application through the Job Tracker Application class
	public static void main(String[] args) {
		SpringApplication.run(JobTrackerApplication.class, args);
	}

}
