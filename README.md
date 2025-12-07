# Vehicles Rental Managenment system

## Project Name & Live URL

1.  Project Name = vehicles rental management syatem.
1.  Live URL = https://vehicle-rental-system-three.vercel.app/api/v1

## Features & Technology Stack.

This project is the vehicle rental management system managing backend api.The Authentication service provides authentication and authorization funtionalities for the two main roles in the system like admin and customer.this system build using- TypeScript, Express.js (Node.js web framework), PostgreSQL (database), bcrypt (password hashing), jsonwebtoken (JWT authentication)

## Setup & Usage Instructions.

### setup Instructions:

### Usage Instructions:

#### Authendtivation

    1.Reguster a new user account
    https://vehicle-rental-system-three.vercel.app/api/v1/auth/signup

    Account create info example
        {
            "name": "Java Script",
            "email": "java@script.com",
            "password": "securePassword123",
            "phone": "01512345678",
            "role": "customer"
        }

    2. Login and receive JWT authentication token
    https://vehicle-rental-system-three.vercel.app/api/v1/auth/signin

    Login needs info example
        {
            "email": "java@script.com",
            "password": "securePassword123",
        }

#### Users

    3.Get all user can see only admin
    https://vehicle-rental-system-three.vercel.app/api/v1/users

    2. Admin can change user details and user can change without other thing
    https://vehicle-rental-system-three.vercel.app/api/v1/users/:userId

#### Vehicles

#### Bookings
