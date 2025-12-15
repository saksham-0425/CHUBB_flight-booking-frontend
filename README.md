# AeroFlux – Flight Booking Frontend
A modern, responsive Flight Booking Frontend Application built using Angular, designed to work with a microservices-based backend.
AeroFlux allows users to search flights, authenticate securely, and interact with a clean, professional UI inspired by real-world travel platforms.

### Project Structure
```
src/
│
├── app/
│   ├── core/
│   │   └── services/
│   │       └── auth.service.ts
│   │
│   ├── pages/
│   │   ├── search/
│   │   │   ├── search.html
│   │   │   ├── search.css
│   │   │   └── search.ts
│   │   │
│   │   ├── login/
│   │   │   ├── login.html
│   │   │   ├── login.css
│   │   │   └── login.ts
│   │   │
│   │   └── register/
│   │       ├── register.html
│   │       ├── register.css
│   │       └── register.ts
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
    U[User<br/>Browser]

    %% Frontend
    FE[Angular Frontend<br/>AeroFlux UI]

    %% API Gateway
    GW[API Gateway<br/>JWT Validation]

    %% Auth
    AUTH[Auth Service<br/>Login / Register]

    %% Core Services
    FLIGHT[Flight Service<br/>Search Flights]
    BOOK[Booking Service<br/>Reserve Seats]
    NOTIF[Notification Service<br/>Email / Alerts]

    %% Databases
    AUTHDB[(Auth DB)]
    FLIGHTDB[(Flight DB)]
    BOOKDB[(Booking DB)]

    %% Flow
    U -->|HTTP Requests| FE
    FE -->|REST API| GW

    GW -->|/auth/*| AUTH
    GW -->|/flights/*| FLIGHT
    GW -->|/bookings/*| BOOK

    AUTH --> AUTHDB
    FLIGHT --> FLIGHTDB
    BOOK --> BOOKDB

    BOOK --> NOTIF

    %% Responses
    AUTH -->|JWT Token| GW
    GW -->|Response| FE
    FE -->|UI Render| U
```

### Tech Stack

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)



### AeroFlux provides :

- Seamless flight search experience.

- Secure authentication (Login & Register).

- Modern UI with consistent theme.

- Fully responsive design for all devices.



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
Resgister page :-
```
<img width="1898" height="949" alt="image" src="https://github.com/user-attachments/assets/10f96d6a-ce74-432f-a023-c9bc0cbc9a29" />

```
User registers successfully :
```
<img width="1916" height="1009" alt="image" src="https://github.com/user-attachments/assets/1a50c2bf-945e-4a53-8e13-5b20e3f3c1dd" />

```
Login Successful :
```
<img width="1900" height="947" alt="image" src="https://github.com/user-attachments/assets/6996ddc5-cccb-4509-b6c3-8d63ea6955b9" />

### Validations :-
```
Source and Destination can not be the same validation :-
```
<img width="1919" height="1019" alt="image" src="https://github.com/user-attachments/assets/a0b8e7e7-9fe5-4159-8edc-5935275ddf12" />

```
Incomplete details validation
```
<img width="1919" height="1011" alt="image" src="https://github.com/user-attachments/assets/80f3b4f4-1ea7-46f6-b8f8-ecbdc7dea7d3" />

```
Can not search flights for past dates validation :-
```
<img width="1919" height="1014" alt="image" src="https://github.com/user-attachments/assets/de8bb52e-7a73-4be6-899c-d2c8f18f7aec" />

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


