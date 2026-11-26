package com.alexkem.JobTracker.repository;

import com.alexkem.JobTracker.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

//Creates a Job Repository Interface extends the JpaRepository that gives you Database methods.
public interface JobRepository extends JpaRepository<Job, Integer> {
}
