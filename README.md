# RC Podcast-studio-website

link: https://rcstudiopodcast.netlify.app/

## Overview

This a React application built with Vite. The application includes components for user registration, login, a landing page, and a homepage. It uses React Router for routing and React-Modal for modals.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have `Node.js` and `npm` installed.
- You have a basic understanding of React and how it works.
- You are using the Vite build tool for this project.

## Installation

1. Clone this repository.

git clone https://github.com/Reniercoetzer92/RENCOE123_PTO2301_GroupB_RenierCoetzer_DWA18.git
Install dependencies using npm:

npm run dev
Open your web browser and navigate to http://localhost:3000 to access the application.

Follow the on-screen instructions to use the application, which includes a landing page, user registration, and login.

# Structure

# RC Podcast

## Table of Contents

- [RC Podcast-studio-website](#rc-podcast-studio-website)
  - [Overview](#overview)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Structure](#structure)
- [RC Podcast](#rc-podcast)
  - [Table of Contents](#table-of-contents)
  - [Project Description](#project-description)
  - [Some of the Components](#some-of-the-components)
    - [1. HamburgerMenu Component](#1-hamburgermenu-component)
    - [2. LandingPageCards Component](#2-landingpagecards-component)
    - [3. PreviewShows Component](#3-previewshows-component)
    - [4. FavoriteDialog Component](#4-favoritedialog-component)
    - [5. Signup Component](#5-signup-component)
    - [6. SearchDialog Component](#6-searchdialog-component)
    - [7. SettingsModal Component](#7-settingsmodal-component)
    - [8. CarouselCards Component](#8-carouselcards-component)
  - [Contributing](#contributing)
  - [License](#license)

## Project Description

Provide a brief description of your project here. Mention its purpose, key features, and any relevant information.

## Some of the Components

### 1. HamburgerMenu Component

The `HamburgerMenu` component represents a hamburger-style menu button with the following props:

- `onSettingsClick`: Callback function to handle menu button click.
- `isButtonEnabled`: Indicates whether the button is enabled or disabled.
- `isMenuOpen`: Indicates whether the menu is open or closed.
- `resetHamburger`: Callback function to reset the hamburger menu.

### 2. LandingPageCards Component

The `LandingPageCards` component fetches show previews and displays them in a carousel. It includes a description and a login modal.

### 3. PreviewShows Component

The `PreviewShows` component displays featured shows, allows favoriting, and handles various user interactions. It includes a carousel for the featured shows.

### 4. FavoriteDialog Component

The `FavoriteDialog` component represents a dialog for favorited shows. It includes details about the show, episodes, and options for listening.

### 5. Signup Component

The `Signup` component provides a user registration form with fields for name, email, password, and an option to join the newsletter.

### 6. SearchDialog Component

The `SearchDialog` component allows users to search and filter shows. It includes options for sorting, filtering by genre, and alphabetical search.

### 7. SettingsModal Component

The `SettingsModal` component offers options for mode switching (light/dark) and user actions like logout.

### 8. CarouselCards Component

display different shows in carousels.

## Contributing

Renier Coetzer

## License

Created by Renier Coetzer

