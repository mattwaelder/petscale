# PetScale!
An application for visualizing and tracking the weight of your pets over time.

* Live site available at: https://petscale.xyz

<img width="600" alt="petscale" src="https://github.com/mattwaelder/petscale/assets/74801942/859eae17-3396-4937-8818-d5905a490d37">

## Background

This project was originally an MVP (minimum viable project) I created during my time at Hack Reactor. The idea stemming from this MVP stuck with me, and I decided that I should built the project. This required a significant amount of work and also required me to learn a lot about hosting and deploying rather complicated full stack applications.

## Technical Challenges

  * I dealt with many technical issues from this project, here are a few:
    
    - Revamping the code base to work dynamically with multiple users and their pets (not just magic numbers and hard coded values).
    - Preparing the codebase for hosting on AWS, this required all pathing to be relative and many new references to environment variables.
    - Configuring Nginx to work as a reverse proxy, delegating traffic to either the react application or the express server on the fly.
    - Enabling Firebase authentication, password reset, and account creation (all handled by firebase but required it to be plugged in).
    - Database security concerns drove me to remove the database from the AWS instance and move it to a MongoDB Atlas hosted database. Moving the db to a 3rd party was a good move for security and potential scaling
    - Rewriting the CSS to allow for a good user experience on mobile.
    - The above rewrite illuminated flaws in my css, and so multiple components needed to have their flex-based styling replaced with grid styling.

## How does the app work?

  * Behind the scenes:
    
    - Authentication is handled through Firebase, with user data being stored by Googles Firebase and mostly obscured to me (this is great for security).
    - After auth, a request is made by the express server to the database which returns all the data for that user.
    - The response from the server provides data which is manipulated and stored in React states which govern the components on the DOM.
    - Nginx is used to direct traffic to the domain either to the React frontend or the Express server.
      
  * How does the tech stack come together?
    
    - For the user, this is all handled seamlessly thanks to controlled components and react state managing component life cycle. 

## Author

Matthew Waelder

[![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/mattwaelder/)](https://www.linkedin.com/in/mattwaelder/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/mattwaelder)](https://github.com/mattwaelder)

My Portfolio Website: https://mattwaelder.com

## Technology Used

**Front-end:** &emsp;&nbsp;&nbsp;

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)![Axios](https://img.shields.io/badge/axios-5a29e4.svg?style=for-the-badge&logo=axios&logoColor=white)


**Back-end** &emsp;&nbsp; &nbsp;

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)


## Thanks for Reading!
If you've made it all the way down here, I would like to thank you for reading. I hope that this application can be useful.

