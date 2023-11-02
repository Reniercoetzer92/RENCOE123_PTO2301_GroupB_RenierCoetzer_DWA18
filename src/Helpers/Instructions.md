# Capstone Project - Podcast App

Welcome to the Capstone Project for the CodeSpace Software Development Program. In this project, your goal is to build a podcast app that allows users to browse various podcast shows, play episodes, and track their favorite episodes.

## Technology

You have the freedom to choose the technology/framework set you are comfortable with. Options include plain JavaScript, Next.js, Create React App (CRA), or Vue.js. While TypeScript is recommended, it is not required. During the final assessment, you will need to discuss your technology choices and explain your code.

## Data

The project involves three primary data types:

- **EPISODE**: Corresponds to a specific MP3 file that users can listen to.
- **SEASON**: A collection of EPISODEs released over a specific timespan.
- **SHOW**: A specific podcast that contains one or more SEASONs.

Additionally, a summarised version of a SHOW, called **PREVIEW**, only contains basic data (no SEASON or EPISODE).

## Endpoints

You can fetch data from the following endpoints:

1. [https://podcast-api.netlify.app/shows](https://podcast-api.netlify.app/shows): Returns an array of PREVIEW objects.
2. [https://podcast-api.netlify.app/id/<ID>](https://podcast-api.netlify.app/id/<ID>): Returns a single SHOW object with embedded SEASON and EPISODE objects.

## Relationships

The different data types are related as follows:

- One or more EPISODEs make up a SEASON.
- One or more SEASONs make up a SHOW.
- SHOW and PREVIEW are different forms of the same data, related by the `id` property.
- SHOW and PREVIEW both have a property named GENRE.
- GENRE inside PREVIEW is an array of numbers (id).
- GENRE inside SHOW is an array of strings (title).

## Genre Titles

Since genre information is exposed as specific GENRE IDs on PREVIEW, it is recommended that you include the mapping between GENRE IDs and titles in your code.

| ID | Title                               |
|----|-------------------------------------|
| 1  | Personal Growth                     |
| 2  | True Crime and Investigative Journalism |
| 3  | History                             |
| 4  | Comedy                              |
| 5  | Entertainment                        |
| 6  | Business                             |
| 7  | Fiction                             |
| 8  | News                                |
| 9  | Kids and Family                     |

## User Stories

Your goal is to complete the following 50 User Stories to build a fully functional podcast app. These stories cover various features and functionalities, and they can be completed in any order.

(Include the list of user stories here. You can copy and paste the provided user stories.)

Your final project will be assessed based on the number of completed user stories, the overall user experience provided by your app, and the quality of your live presentation and Git commit messages.

## Submission

Once you have completed your project and are satisfied with the result, please submit your code to GitHub and share the GitHub link via the "DWA18 Capstone Submission" in the [Projects] tab.

Good luck with your Capstone Project!
