# Vehicles Rental Managenment system

## Project Name & Live URL

1.  Project Name = vehicles rental management syatem.
2.  Live URL = https://vehicle-rental-system-three.vercel.app/api/v1

## Features & Technology Stack.

This project is the vehicle rental management system managing backend api.The Authentication service provides authentication and authorization funtionalities for the two main roles in the system like admin and customer.this system build using- TypeScript, Express.js (Node.js web framework), PostgreSQL (database), bcrypt (password hashing), jsonwebtoken (JWT authentication)

## Setup & Usage Instructions.

### setup Instructions.

1.  Clone the Project:

        git clone https://github.com/hisuvo/vehicle-rental-system.git
        cd vehicle-rental-system

2.  Install Dependencies

        npm install

3.  Configure Environment Variables

        PORT = 8000

        CONNECTION_STR = 'postgresql://neondb_owner:npg_HZJoPymz2SQ5@ep-fancy-sky-ah8y8jc0-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

        PRIVATE_KEY =
        'e310621343885d979f0d81339b0e3b235e9908880a2025ceb838b0e67727825afc87ace5f4e4b2aeaffc39a2082e01532016c9df2a56a596594ed1bca00bb2c6'

4.  Run the Development Server

        npm run dev

5.  Server will Start

        http://localhost:8000

### Usage Instructions.

#### Authendtivation

1.  Reguster a new user account (POST)

        https://vehicle-rental-system-three.vercel.app/api/v1/auth/signup

Account create info example

        {
            "name": "Java Script",
            "email": "java@script.com",
            "password": "securePassword123",
            "phone": "01512345678",
            "role": "customer"
        }

2.  Login and receive JWT authentication token (POST)

        https://vehicle-rental-system-three.vercel.app/api/v1/auth/signin

Login needs info example

        {
            "email": "java@script.com",
            "password": "securePassword123",
        }

#### Users

3.  Get all user can see only admin (GET)

        https://vehicle-rental-system-three.vercel.app/api/v1/users

4.  Admin can change user details and Customer can update own profile only (PUT)

        https://vehicle-rental-system-three.vercel.app/api/v1/users/:userId

5.  Admin can delete a user only if no active bookings exist (DELETE)

        https://vehicle-rental-system-three.vercel.app/api/v1/users/:userId

#### Vehicles

6.  Only Admin can create Vehicle and need Jwt authorization bearar token (POST)

        https://vehicle-rental-system-three.vercel.app/api/v1/vehicles

create vehicle body expect data example:

    {
        "vehicle_name": "Toyota Camry 2024",
        "type": "car",
        "registration_number": "ABC-1234",
        "daily_rent_price": 50,
        "availability_status": "available"
     }

7.  Publice can see all vehicles (GET)

        https://vehicle-rental-system-three.vercel.app/api/v1/vehicles

8.  Publice can see specific vehicle details (GET)

        https://vehicle-rental-system-three.vercel.app/api/v1/vehicles/:vehicleId

9.  Only Admin can Update vehicle details, price, or availability status and need jwt bearar token (PUT)

        https://vehicle-rental-system-three.vercel.app/api/v1/vehicles/:vehicleId

update vehicle body expect data example:

        {
            "vehicle_name": "Toyota Camry 2024 Premium",
            "type": "car",
            "registration_number": "ABC-1234",
            "daily_rent_price": 55,
            "availability_status": "available"
        }

10. Only Admin can delete Vehicles only if no active bookings exist. (DELETE)

        https://vehicle-rental-system-three.vercel.app/api/v1/vehicles/:vehicleId

#### Bookings

11. Customer and Adimn can create new booking but need jwt bearar token (POST)

        https://vehicle-rental-system-three.vercel.app/api/v1/bookings

booking body expect blow data

        {
            "customer_id": 1,
            "vehicle_id": 2,
            "rent_start_date": "2024-01-15",
            "rent_end_date": "2024-01-20"
        }

12. Admin sees all Bookings vehicles, Customer sees own vehicles (GET)

        https://vehicle-rental-system-three.vercel.app/api/v1/bookings

13. Customer cancel booking (before start date only) ,Admin mark as "returned (updates vehicle to "available"), System auto-mark as "returned" when period ends (PUT)

        https://vehicle-rental-system-three.vercel.app/api/v1/bookings/:bookingId

Admin update body expect

        {
            "status": "returned"
        }

Customer update body expect

        {
            "status": "cancelled"
        }
