# AeroFlux – Flight Booking Frontend
(Docker and local application.properties have also been created, (screenshots attached below for the project and folder structure.))

A modern, responsive Flight Booking Frontend Application built using Angular, designed to work seamlessly with a secure microservices-based backend.

AeroFlux allows users to search flights, authenticate securely, manage their accounts, and interact with a clean, professional UI inspired by real-world travel platforms.

### Requirements Fulfilled (Explicit Confirmation)

All the following requirements have been fully implemented and verified in the project:
```
| Requirement                         | Status        | Enforcement           |
| ----------------------------------- | -----------   | --------------------- |
| Add Flights (Admin)                 |     Completed | Backend + UI          |
| RBAC (Only Admin can add flights)   |     Completed | API Gateway + Backend |
| Two Properties Files                |     Completed | Config Server         |
| Optimised Dockerfile                |     Completed | Multi-stage build     |
| Change Password                     |     Completed | Backend + UI          |
| UI Validations                      |     Completed | Angular               |
| In-app Messages / Popups            |     Completed | Angular               |
| Backend / Postman Bypass Prevention |     Enforced  | Gateway + Security    |
```
Security Guarantee : 
```
All rules (authentication, authorization, RBAC) are enforced at the API Gateway and backend service level.
They cannot be bypassed via Postman, curl, or direct backend calls.
```

### Project Structure
```
src/
│
├── app/
│   ├── core/
│   │   ├── services/
│   │   │   └── auth.service.ts
│   │   ├── guards/
│   │   │   └── auth-guard.ts
│   │   └── interceptors/
│   │       └── auth.interceptor.ts
│   │
│   ├── features/
│   │   ├── flight/
│   │   │   └── search/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── change-password/
│   │   └── booking/
│   │
│   └── app.routes.ts
│
├── assets/
│   └── hero-place.png
│
└── main.ts
```

### Overall flow:-
```mermaid
flowchart LR
    %% User
    U[User Browser]

    %% Frontend
    FE[Angular Frontend<br/>AeroFlux UI]

    %% API Gateway
    GW[API Gateway<br/>JWT Validation]

    %% Auth
    AUTH[Auth Service<br/>Login / Register / Change Password]

    %% Core Services
    FLIGHT[Flight Service]
    BOOK[Booking Service]
    NOTIF[Notification Service]

    %% Databases
    AUTHDB[(Auth DB)]
    FLIGHTDB[(Flight DB)]
    BOOKDB[(Booking DB)]

    U --> FE
    FE --> GW

    GW --> AUTH
    GW --> FLIGHT
    GW --> BOOK

    AUTH --> AUTHDB
    FLIGHT --> FLIGHTDB
    BOOK --> BOOKDB

    BOOK --> NOTIF

    AUTH --> GW
    GW --> FE
    FE --> U
```

### Tech Stack

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### Authentication & Authorization (RBAC)
Authentication
- JWT-based authentication
- Token attached automatically using HTTP interceptor
- Protected routes guarded using authGuard
Role-Based Access Control
```
| Role       | Permissions                                   |
| ---------- | --------------------------------------------- |
| ROLE_USER  | Search flights, book tickets, change password |
| ROLE_ADMIN | Add flights, manage flight inventory          |
```
Even if an admin or user tries to violate rules via Postman, the backend rejects the request.


AdminUI :-
<img width="1919" height="1014" alt="image" src="https://github.com/user-attachments/assets/0aaf460f-7eb8-4da1-b49c-041e4f28a748" />
User tries to add a flight, backend logic blocks it :-
<img width="1270" height="753" alt="image" src="https://github.com/user-attachments/assets/3c435fa7-33d4-4dfc-ad0a-a60bb1ea1892" />

### Change Password Feature :-

- Dedicated Change Password UI

- Old password verification

- New password validation

- Confirm password matching

- Secure backend API (PUT /auth/change-password)

- JWT-authenticated & role-protected

- Success and error messages shown in-app

Form to change the password, based on the old password :-
<img width="1919" height="1008" alt="image" src="https://github.com/user-attachments/assets/d56bb972-8894-4fd8-9704-b7db826d6d1f" />

Password change option visible to only logged in users :-
<img width="1919" height="950" alt="image" src="https://github.com/user-attachments/assets/44b885aa-3bea-4cc4-aca6-39e560c21280" />

### Features Implemented So Far
User Features

- Flight search (source, destination, date)

- Secure login & registration

- Change password

- Booking flights
- Cancel Flights (not within 24 hours of the scheduled flight).

- Logout

- Responsive UI

Booking being confirmed :-
<img width="1919" height="1015" alt="image" src="https://github.com/user-attachments/assets/cd981d7f-105f-410e-9f42-05c9d0119e5e" />

Track booking through PNR :-
<img width="1919" height="1009" alt="image" src="https://github.com/user-attachments/assets/428e81a7-3622-437f-9712-3143b3fdb3eb" />

Admin Features

- Responsive UI

- Add flights

- RBAC-protected admin routes

- Backend enforcement (cannot be bypassed)
  
Admin can access, edit and delete all the flights :-
  <img width="1919" height="1017" alt="image" src="https://github.com/user-attachments/assets/cedd8dd7-c0d6-4db2-b91e-0e23f5db914f" />

Validations have been applied for adding a flight (admin only) :-
<img width="1919" height="1010" alt="image" src="https://github.com/user-attachments/assets/9bdaf52a-4001-493d-b295-196bd4222dc8" />






### Screenshots of the project with validations 
```
Home page :-
```
<img width="1898" height="947" alt="image" src="https://github.com/user-attachments/assets/2e086f03-9574-41de-95f8-e4588bf81f59" />

```
Flight Search with source, destination and date :-
```
<img width="1919" height="943" alt="image" src="https://github.com/user-attachments/assets/e5281de6-9bd6-4811-b218-5b06776c2390" />

```

Login Successful :
```
<img width="1900" height="947" alt="image" src="https://github.com/user-attachments/assets/6996ddc5-cccb-4509-b6c3-8d63ea6955b9" />

### Validations :-
```
Source and Destination can not be the same validation :-
```
<img width="1919" height="948" alt="image" src="https://github.com/user-attachments/assets/804ea2bc-eb2a-47dc-a53c-ac245dfe8be7" />
```
Incomplete details validation
```
<img width="1919" height="947" alt="image" src="https://github.com/user-attachments/assets/8fb3893c-e7a7-4eb9-bc37-c9674462e2b2" />
```
Can not search flights for past dates validation :-
```
<img width="1919" height="719" alt="image" src="https://github.com/user-attachments/assets/62e5bdfb-c0d6-4412-8c4e-7393e5d81eab" />


<img width="1918" height="1015" alt="image" src="https://github.com/user-attachments/assets/3bf57006-6b3f-4e70-9676-01426e7746c8" />

### All critical validations are implemented on the frontend:

Search Form

- Source is required

- Destination is required

- Source and Destination cannot be the same

- Date is required

- Past dates are not allowed

Login Form

- Email is required

- Valid email format enforced

- Password is required

Register Form

- Name is required

- Email is required and validated

- Password is required

- Submit disabled if form is invalid

Validation messages are shown immediately to guide users.

### How to run locally 

Prerequisites

- Node.js (v18+ recommended)

- Angular CLI

Steps 

```
git clone https://github.com/saksham-0425/CHUBB_flight-booking-frontend
cd CHUBB_flight-booking-frontend
npm install
ng serve
```
Open : 
```
http://localhost:4200
```

### Backend Integration

The frontend connects to backend services via:

- API Gateway

- JWT-secured endpoints

- Microservices architecture

Example:
```
GET /flights/search?source=DEL&destination=BOM&date=2025-01-10
```

### Author
Saksham Omar

- Final Year B.Tech CSE


