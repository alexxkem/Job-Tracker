# Job Tracker

A full-stack web application for managing job applications in one place. Job Tracker lets users record applications, track their progress through the hiring process, and view a simple dashboard of application activity.

Built as a personal project to practice REST API development, database persistence, React, and automated testing.

## Features

- **Application dashboard:** View total applications, interviews, and offers.
- **Application management:** Add, view, edit, and delete job applications.
- **Status tracking:** Track applications using statuses such as Applied, Interview, Denied, and Offer.
- **Application details:** Store a company, position, application date, job posting URL, and status.
- **Recent applications:** Preview up to six applications on the dashboard and access an all-applications page.
- **Validation and feedback:** Validate required fields and display loading or error states.
- **Automated tests:** Unit tests for service logic and MVC tests for API endpoints.

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, React Router, JavaScript, CSS, Vite |
| Backend | Java 27, Spring Boot 4.1.2, Spring Web MVC, Spring Data JPA |
| Database | PostgreSQL, Docker |
| Testing | JUnit 5, Mockito, Spring MockMvc |
| Build tools | Gradle (backend), npm (frontend) |

## Project Structure

```text
JobTracker Project/
├── JobTracker/                   # Spring Boot API and tests
│   ├── src/main/java/           # Controller, service, repository, entity
│   ├── src/main/resources/      # Application configuration
│   ├── src/test/java/           # JUnit, Mockito, MockMvc tests
│   ├── build.gradle
│   └── gradlew.bat
└── jobtracker-frontend/         # React + Vite application
    ├── src/components/          # Dashboard, list, details, forms
    ├── src/styles/
    └── package.json
```

## Getting Started

The application currently runs locally, with the frontend at `http://localhost:5173` and the backend at `http://localhost:8080`.

### Prerequisites

- Java 27
- Node.js and npm compatible with Vite 8
- Docker Desktop (or a local PostgreSQL installation)

### 1. Configure the database

In `JobTracker/src/main/resources/application.properties`, use environment variables rather than committing real credentials:

```properties
spring.application.name=JobTracker
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
```

Create or update the local `JobTracker/compose.yml` file with matching settings. This file is excluded from Git in the current project, so it may need to be created after cloning:

```yaml
services:
  postgres:
    image: postgres:17
    environment:
      POSTGRES_DB: jobs
      POSTGRES_USER: jobtracker
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    ports:
      - "5432:5432"
```

In **PowerShell**, set your local environment variables (choose your own password):

```powershell
$env:DB_NAME = "jobs"
$env:DB_USER = "jobtracker"
$env:DB_PASSWORD = "your-local-password"
```

Start the database from the backend directory:

```powershell
cd JobTracker
docker compose up -d
```

### 2. Run the backend

From `JobTracker/`, using the same environment variables:

```powershell
.\gradlew.bat bootRun
```

The REST API will be available at `http://localhost:8080/applications`.

### 3. Run the frontend

Open another terminal in `jobtracker-frontend/`:

```bash
npm ci
npm run dev
```

Open `http://localhost:5173` in your browser.

> **Note:** The backend and frontend currently use localhost settings. Update the CORS origin and API base URLs before deploying to a hosted environment.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/applications` | List job applications |
| `GET` | `/applications/{jobId}` | Get an application by ID |
| `POST` | `/applications` | Create an application |
| `PUT` | `/applications/{jobId}` | Update an application |
| `DELETE` | `/applications/{jobId}` | Delete an application |

Example request body for `POST /applications`:

```json
{
  "company": "Example Company",
  "position": "Software Engineer",
  "status": "Applied",
  "dateApplied": "2026-11-25T10:00:00",
  "url": "https://example.com/jobs/123"
}
```

The API validates nonblank company, position, and status fields. Requests for nonexistent applications return `404 Not Found` for the GET and PUT endpoints.

## Running Tests

Run the backend tests from `JobTracker/`:

```powershell
.\gradlew.bat test
```

The project includes **13 tests** across two test classes:

- **6 service tests:** Use JUnit and Mockito to verify CRUD behavior and error handling.
- **7 controller tests:** Use MockMvc to check HTTP status codes, JSON responses, validation, and controller-to-service interactions.

## Screenshots

Main Page:
![alt text](<Screenshot 2026-11-26 001011.png>)

Job Card Page:
![alt text](<Screenshot 2026-11-25 235943.png>)

Add Job Page:
![alt text](<Screenshot 2026-11-26 000009.png>)

Edit Job Page:
![alt text](<Screenshot 2026-11-26 000020.png>)

View All Job Page:
![alt text](<Screenshot 2026-11-26 001042.png>)

## Future Improvements

- User authentication and user-specific application data
- Filtering and sorting applications
- Deployment of the frontend, backend, and database
- Additional integration tests

## Project Status

Personal learning and portfolio project. Currently configured for local development.
