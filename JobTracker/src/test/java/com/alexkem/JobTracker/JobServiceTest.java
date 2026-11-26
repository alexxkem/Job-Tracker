package com.alexkem.JobTracker;

import com.alexkem.JobTracker.Service.JobService;
import com.alexkem.JobTracker.model.Job;
import com.alexkem.JobTracker.repository.JobRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

//Extends the Mockito Extension class for it's methods
@ExtendWith(MockitoExtension.class)
public class JobServiceTest {

    //Creates a Mock Job Repository
    @Mock
    private JobRepository jobRepository;

    //Mocks a Job Service that is Injected by the Job Service
    @InjectMocks
    private JobService jobService;

    @Test
    void shouldGetJobById() {
        //Arrange
        Job job = new Job();
        job.setJobId(1);
        when(jobRepository.findById(1)).thenReturn(Optional.of(job));

        //Act
        Job result = jobService.getById(1);

        //Assert
        assertSame(job, result);
        verify(jobRepository).findById(1);
    }

    @Test
    void ShouldThrowExceptionWhenJobNotFound(){
        //Arrange
        when(jobRepository.findById(999)).thenReturn(Optional.empty());

        //Act
        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () -> jobService.getById(999));

        //Assert
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertEquals("Job Not Found", exception.getReason());
    }

    @Test
    void shouldAddApplication() {
        //Arrange
        Job job = new Job();
        job.setCompany("Capital One");

        //Act
        jobService.addApplication(job);

        //Assert
        verify(jobRepository).save(job);
    }

    @Test
    void shouldDeleteApplication() {
        //Arrange
        Integer jobId = 9;

        //Act
        jobService.deleteApplication(jobId);

        //Assert
        verify(jobRepository).deleteById(jobId);
    }

    @Test
    void shouldUpdateApplication() {
        //Arrange

        //Original Job
        Job job = new Job();
        job.setJobId(1);
        job.setCompany("Capital One");

        //New Job
        Job job1 = new Job();
        job1.setCompany("Dominion Energy");

        when(jobRepository.findById(1)).thenReturn(Optional.of(job));

        //Act
        jobService.updateApplication(1, job1);

        //Assert
        assertEquals(1, job1.getJobId());
        verify(jobRepository).findById(1);
        verify(jobRepository).save(job1);
    }

    @Test
    void shouldNotUpdateNonexistentJob(){
        //Arrange
        Job job = new Job();
        job.setCompany("Capital One");

        when(jobRepository.findById(999)).thenReturn(Optional.empty());

        //Act
        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () -> jobService.updateApplication(999, job));

        //Assert
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        verify(jobRepository, never()).save(any(Job.class));
    }

}
