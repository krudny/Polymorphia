# Polymorphia

## Overview  
Polymorphia is a gamified full stack application designed to support coordinators, instructors, and students in programming courses. Developed based on gamification strategies implemented in the Object-Oriented Programming course at AGH University of Science and Technology, Polymorphia stands out with its visually appealing, user-friendly interface and ease of maintenance compared to similar solutions.

## Live Demo  
The project is available [here](https://polymorphia.pl/).  

Test credentials:

Email: `sampleuser@test.com`  
Password: `Samplepassword1`

## Sample Views

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/cf654bec-0251-489f-ae8b-9bea11d1880d" width="700" style="height:auto;"></td>
    <td><img src="https://github.com/user-attachments/assets/86d1181f-26aa-4b1a-906e-04c38017bdfd" width="700" style="height:auto;"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/1356d0e2-060b-4f51-9f89-b43125a8c2b0" width="700" style="height:auto;"></td>
    <td><img src="https://github.com/user-attachments/assets/bb9b7ed0-8830-4fb2-88fe-32fc5cd5c5fb" width="700" style="height:auto;"></td>
  </tr>
</table>

## CI/CD Pipeline  

Our project uses two-step infrastructure process to build and deliver updates. 

First, all code changes are stored safely in the Google Artifact Registry. 

Then, the updates are tested on a separate staging server to ensure data safety and software reliability before making changes public. 

 Finally, after checking everything works well, the updates are moved to the production server where real users access the app. This setup helps make sure the app stays reliable and updates happen quickly without interruptions.

## CI/CD Pipeline

This project follows a branch promotion model with automated deployments and manual release control.

All feature development happens on feature branches, which are merged into the develop branch via pull requests. Each push to develop triggers the full staging pipeline: tests are executed, database migrations are applied, a Docker image is built and pushed to Google Artifact Registry, and the application is deployed to the staging server. A health check verifies that the deployment is stable before marking it as successful.

When the staging environment is confirmed healthy, a production release can be initiated through the `Release` workflow. It performs a fast-forward merge from develop to main, preserving all original commit hashes. An annotated Git tag and a GitHub Release with auto-generated release notes are created as part of this process.

## Technologies  
- **Backend:** Java 21, SpringBoot, Docker
- **Frontend:** Next.js, Typescript, Tailwind, GSAP
- **Database:** PostgreSQL
- **Cloud & Deployment:** Google Cloud Platform, Vercel 
- **Development Environment:** IntelliJ IDEA, WebStorm, Figma, Jira, Postman

## Authors  
- Kamil Rudny [GitHub](https://github.com/krudny) 
- Katarzyna Lisiecka-Meller [GitHub](https://github.com/LisieckaK00)  
- Urszula Stankiewicz [GitHub](https://github.com/ustankie)  
- Krzysztof Ligarski [GitHub](https://github.com/kligarski)
