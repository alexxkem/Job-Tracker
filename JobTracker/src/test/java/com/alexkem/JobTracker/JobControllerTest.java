package com.alexkem.JobTracker;

import com.alexkem.JobTracker.Controller.JobController;
import com.alexkem.JobTracker.Service.JobService;
import com.alexkem.JobTracker.model.Job;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//Annotation to Web Test that runs the Job Controller class
@WebMvcTest(JobController.class)
public class JobControllerTest {

    //Creates a Mock MVC to send HTTP requests without a real server
    @Autowired
    private MockMvc mockMvc;

    //Mocks a Job Service to runs Tests
    @MockitoBean
    private JobService jobService;

    @Test
    void shouldReturn404WhenJobNotFound() throws Exception {
        //Arrange
        when(jobService.getById(999)).thenThrow(new ResponseStatusException(HttpStatus.NOT_FOUND));

        //Assert
        mockMvc.perform(get("/applications/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldReturnJobWhenFound() throws Exception {
        //Arrange
        Job job = new Job();
        job.setJobId(1);
        job.setCompany("Capital One");

        when(jobService.getById(1)).thenReturn(job);

        //Assert
        mockMvc.perform(get("/applications/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.company").value("Capital One"));
    }

    @Test
    void shouldReturnAllApplications() throws Exception {
        //Arrange
        Job job1 = new Job();
        job1.setJobId(1);
        job1.setCompany("Capital One");

        Job job2 = new Job();
        job2.setJobId(2);
        job2.setCompany("Dominion Energy");

        when(jobService.getJobList()).thenReturn(List.of(job1, job2));

        //Assert
        mockMvc.perform(get("/applications"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].company").value("Dominion Energy"))
                .andExpect(jsonPath("$[1].company").value("Capital One"))
                .andExpect(jsonPath("$.length()").value(2));

    }

    @Test
    void shouldAddApplication() throws Exception{
        //Arrange
        String jobJson = """
                {
                    "company": "Capital One",
                    "position": "Software Engineer",
                    "status": "Applied"
                }
                """;

        //Act
        mockMvc.perform(post("/applications")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jobJson))
                .andExpect(status().isOk());

        //Assert
        verify(jobService).addApplication(any(Job.class));
    }

    @Test
    void shouldReturn400WhenCompanyIsBlank() throws Exception {
        //Arrange
        String jobJson = """
                {
                    "company": "",
                    "position": "Software Engineer",
                    "status": "Applied"
                }
                """;

        //Act
        mockMvc.perform(post("/applications")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jobJson))
                .andExpect(status().isBadRequest());

        //Assert
        verify(jobService, never()).addApplication(any(Job.class));
    }

    @Test
    void shouldUpdateApplication() throws Exception{
        //Arrange
        String jobJson = """
                {
                    "company": "Capital One",
                    "position": "Software Engineer",
                    "status": "Applied"
                }
                """;

        //Act
        mockMvc.perform(put("/applications/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jobJson))
                .andExpect(status().isOk());

        //Assert
        verify(jobService).updateApplication(eq(1), any(Job.class));
    }

    @Test
    void shouldDeleteApplication() throws Exception {
        //Act
        mockMvc.perform(delete("/applications/1"))
                .andExpect(status().isOk());

        //Assert
        verify(jobService).deleteApplication(1);
    }
}
