# Netflix Clone

A streaming platform where users can enjoy a variety of shows and movies while also managing their memberships, profiles, and personal preferences.

## Features

- **User Authentication**: Secure user registration and authentication system.
- **Payment Integration**: Seamless integration with Stripe for membership payment processing.
- **Membership Management**: Allows users to update or cancel their memberships.
- **Profile Management**: Create, edit, and delete user profiles for personalized viewing.
- **Watch History**: Keep track of shows and episodes a user is watching.
- **Continuation**: Users can pick up right where they left off in their viewing.
- **Like/Dislike**: Express opinions about shows by liking or disliking them.
- **My List**: Personalized list for users to store their favorite shows.

## Technologies Used

- **Frontend**: Vite (React)
- **Styling**: Tailwind CSS
- **State Management** - Redux, RTKQuery
- **Backend**: Flask (Python)
- **User Authentication**: JWT
- **Payment Integration**: Stripe API
- **Show Details** - TMDB API
- **Database**: MySQL
- **Documentation**: Swagger UI

## Installation

(Step-by-step instructions for setting up the project on a local machine)

1. Clone the repository:

```bash
git clone https://github.com/deepakVk18/Netflix-Clone.git
```

2. Install dependencies

```bash
cd netflix-clone
npm install    # for React frontend
pip install -r backend/requirements.txt  # for Flask backend
```

3. Configuration
Get to the backend folder and create a .env file with the following keys:
```
SECRET_KEY={ A Secret Hash Key for your flask app }
DB_USERNAME={ Username of the local MySQL Server }
DB_PASSWORD={ Password of the local MySQL Server }
```
```
TMDB_API_KEY= Get this from tmdb website
STRIPE_SECRET_KEY= Get this from Stripe website
STRIPE_PUBLISHABLE_KEY= Get this from Stripe website
```
Get all the following from the Google Firebase Project config
```
apiKey=
authDomain=
projectId=
storageBucket=
messagingSenderId=
appId=
```
4. Install MySQL server and workbench and run the MySQL server in port 3306. Run the following commands:
   ```sql
   CREATE DATABASE IF NOT EXISTS netflix;
   ```
5. Start the Applications
Frontend
```bash
npm run dev
```
Backend
```bash
python -m backend.run
```
6. Go to the constants file inside the backend folder and rename the FRONTEND to 'http://localhost:3000'

7. Navigate to 'http://localhost:3000' on chrome to access the frontend.
8. Navigate to 'http://127.0.0.1:5000/docs' to see the swagger docs of the backend.
9. Register with the email and subscribe to any plan by using the card number - 4242 4242 4242 4242 (provide any expiry and cvv for the card).
10. Login to the account, create new profile and use the application. 

## Database Design:-
![Database Schema](https://github.com/Deepakvk18/Netflix-Clone/assets/103412614/6e91d2c0-4784-4d06-bd94-e3201ffc7a77)

To create the required tables in MySQL, you can also use the following command:
```sql
-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS netflix;
USE netflix;

-- Create the User table
CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(64) UNIQUE,
    email VARCHAR(255),
    plan VARCHAR(32),
    subscribed_at DATETIME,
    CONSTRAINT uc_email UNIQUE (email)
);

-- Create the Plans table
CREATE TABLE Plans (
    id VARCHAR(32) PRIMARY KEY,
    plan VARCHAR(255),
    price FLOAT,
    description VARCHAR(255)
);

-- Create the Profiles table
CREATE TABLE Profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(64),
    language VARCHAR(32),
    children BOOLEAN,
    name VARCHAR(32)
);

-- Create the Ratings table
CREATE TABLE Ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    show_id INT,
    profile_id INT,
    type VARCHAR(8),
    rating INT,
    FOREIGN KEY (profile_id) REFERENCES Profiles(id)
);

-- Create the MyList table
CREATE TABLE MyList (
    id INT AUTO_INCREMENT PRIMARY KEY,
    profile_id INT,
    show_id INT,
    type VARCHAR(8),
    FOREIGN KEY (profile_id) REFERENCES Profiles(id)
);

-- Create the NowWatching table
CREATE TABLE NowWatching (
    id INT AUTO_INCREMENT PRIMARY KEY,
    profile_id INT,
    show_id INT,
    type VARCHAR(8),
    season INT,
    episode INT,
    FOREIGN KEY (profile_id) REFERENCES Profiles(id)
);
```

## Backend Documentation
![Netflix CLone API - Swagger Docs](https://github.com/Deepakvk18/Netflix-Clone/assets/103412614/f2003324-7e76-450a-9a8b-657d6129c941)

## Frontend

