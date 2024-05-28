## Endpoints

List of Available Endpoints:
- `GET /api/doctors`
- `GET /api/doctors?page=:page&limit=:limit`
- `GET /api/doctors?limit=100&sort=name`
- `GET /api/doctors?limit=100&sort=name&name=:name`
- `GET /api/doctors?limit=100&sort=name&speciality=:speciality`
- `GET /api/doctors/:id`
- `POST /api/users/register`
- `POST /api/users/login`
- `POST /api/appointments/`
- `GET /api/appointments/1`
- `DELETE /api/appointments/30`
- `PATCH /api/appointments/1`

### GET /api/doctors
#### Description
- Get all the doctor data with default pagination settings

#### Response
_200 - OK_

- Body
    ```json
    {
      "statusCode": 200,
      "doctors": [
        {
        "name": String,
        "speciality": String,
        "practiceAddress": String,
        "phone": String,
        "email": String,
        "schedule": String
        },
      ],
      "pagination": 
        {
        "totalPages": Integer,
        "currentPage": Integer,
        "totalDoctors": Integer
        }
    }
    ```

_500 - Internal Server Error_

- Body
    ```json
    {
        "statusCode": 500,
        "error": "Internal server error"
    }
    ```

### GET /api/doctors?page=2&limit=5
#### Description
- Get all the doctor data in page 2 and 5 doctors per page

#### Response
_200 - OK_
- Body
    ```json
    {
      "statusCode": 200,
      "doctors": [
        {
        "name": String,
        "speciality": String,
        "practiceAddress": String,
        "phone": String,
        "email": String,
        "schedule": String
        },
      ],
      "pagination": 
        {
        "totalPages": Integer,
        "currentPage": Integer,
        "totalDoctors": Integer
        }
    }
    ```

_500 - Internal Server Error_

- Body
    ```json
    {
        "statusCode": 500,
        "error": "Internal server error"
    }
    ```

### GET /api/doctors?limit=100&sort=name
#### Description
- Get all the doctor data sorted by name ascending

#### Response
_200 - OK_

- Body
    ```json
    {
      "statusCode": 200,
      "doctors": [
        {
        "name": String,
        "speciality": String,
        "practiceAddress": String,
        "phone": String,
        "email": String,
        "schedule": String
        },
      ],
      "pagination": 
        {
        "totalPages": Integer,
        "currentPage": Integer,
        "totalDoctors": Integer
        }
    }
    ```

_500 - Internal Server Error_

- Body
    ```json
    {
        "statusCode": 500,
        "error": "Internal server error"
    }
    ```

### GET /api/doctors?limit=100&sort=name&name=Sena
#### Description
- Get all the doctor data filtered by name

#### Response
_200 - OK_

- Body
    ```json
    {
      "statusCode": 200,
      "doctors": [
        {
        "name": String,
        "speciality": String,
        "practiceAddress": String,
        "phone": String,
        "email": String,
        "schedule": String
        },
      ],
      "pagination": 
        {
        "totalPages": Integer,
        "currentPage": Integer,
        "totalDoctors": Integer
        }
    }
    ```

_500 - Internal Server Error_
- Body
    ```json
    {
        "statusCode": 500,
        "error": "Internal server error"
    }
    ```

### GET /api/doctors?limit=100&sort=name&speciality=Radiology
#### Description
- Get all the doctor data filtered by speciality

#### Response
_200 - OK_

- Body
    ```json
    {
      "statusCode": 200,
      "doctors": [
        {
        "name": String,
        "speciality": String,
        "practiceAddress": String,
        "phone": String,
        "email": String,
        "schedule": String
        },
      ],
      "pagination": 
        {
        "totalPages": Integer,
        "currentPage": Integer,
        "totalDoctors": Integer
        }
    }
    ```

_500 - Internal Server Error_
- Body
    ```json
    {
        "statusCode": 500,
        "error": "Internal server error"
    }
    ```

### GET /api/doctors/:id
#### Description
- Get doctor data by id

#### Response
_200 - OK_

- Body
    ```json
    {
      "statusCode": 200,
      "doctors": [
        {
        "name": String,
        "speciality": String,
        "practiceAddress": String,
        "phone": String,
        "email": String,
        "schedule": String
        },
      ],
      "pagination": 
        {
        "totalPages": Integer,
        "currentPage": Integer,
        "totalDoctors": Integer
        }
    }
    ```

_404 - Not Found_
- Body
    ```json
    {
        "statusCode": 404,
        "error": "Doctor not found"
    }
    ```

_500 - Internal Server Error_
- Body
    ```json
    {
        "statusCode": 500,
        "error": "Internal server error"
    }
    ```

### POST /api/users/register
#### Description
- Post register new user
#### Request
- Body
    ```json
    {
    "username":string,
    "email":string,
    "password":string,
    "phoneNumber":string
    }
    ```

#### Response
_201 - Created_

- Body
    ```json
    {
        "statusCode": 201,
        "message": "User created successfully",
        "newUser": {
            "id": integer,
            "username": string,
            "email": string,
            "password": string,
            "phoneNumber": string,
            "updatedAt": date,
            "createdAt": date
        }
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
        "statusCode": 400,
        "error": "Email already exists"
    }
    ```

_500 - Internal Server Error_
- Body
    ```json
    {
        "statusCode": 500,
        "error": "Internal server error"
    }
    ```

### POST /api/users/login
#### Description
- Post login user

#### Request
- Body
    ```json
    {
    "username":string,
    "password":string
    }
    
#### Response
_200 - Ok

- Body
    ```json
    {
        "statusCode": 201,
        "message": "User created successfully",
        "newUser": {
            "id": integer,
            "username": string,
            "email": string,
            "password": string,
            "phoneNumber": string,
            "updatedAt": date,
            "createdAt": date
        }
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
        "statusCode": 400,
        "error": "Email already exists"
    }
    ```

_500 - Internal Server Error_
- Body
    ```json
    {
        "statusCode": 500,
        "error": "Internal server error"
    }
    ```

### POST /api/appointments/
#### Description
- Post new appointment

#### Request
- Headers
    ```json
    {
      "Authorization": Bearer <access_token>
    }
- Body
    ```json
    {
    "userId": integer,
    "doctorId":integer,
    "time": date,
    "description":string
    }
    
#### Response
_201 - Ok

- Body
    ```json
    {
        "message": "Appointment created successfully",
    "newAppointment": {
        "id": integer,
        "userId": integer,
        "doctorId": integer,
        "time": date,
        "description": string,
        "updatedAt": date,
        "createdAt": date
    }
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
        "error": "notNull Violation: Appointment.doctorId cannot be null"
    }
    ```

_403 - Forbidden_
- Body
    ```json
    {
        "error": "Authorization token is required"
    }
    ```

_500 - Internal Server Error_
- Body
    ```json
    {
        "statusCode": 500,
        "error": "Internal server error"
    }
    ```

### GET /api/appointments/:id
#### Description
- Get appointment by id    

#### Response
_200 - Ok

- Body
    ```json
    {
        "appointment": {
        "id": integer,
        "userId": integer,
        "doctorId": integer,
        "time": date,
        "description": string,
        "createdAt": date,
        "updatedAt": date
    }
    }
    ```

_404 - Not Found_
- Body
    ```json
    {
        "error": "Appointment not found"
    }
    ```
   
_500 - Internal Server Error_
- Body
    ```json
    {
        "statusCode": 500,
        "error": "Internal server error"
    }
    ```

### DELETE /api/appointments/:id
#### Description
- Delete appointment by id    

#### Request
- Headers
    ```json
    {
      "Authorization": Bearer <access_token>
    }

#### Response
_200 - Ok

- Body
    ```json
    {
        "message": "Appointment deleted successfully"
    }
    ```

_404 - Not Found_
- Body
    ```json
    {
        "error": "Appointment not found"
    }
    ```
   
_403 - Forbidden_
- Body
    ```json
    {
        "error": "Authorization token is required"
    }
    ```

_500 - Internal Server Error_
- Body
    ```json
    {
        "error": "Internal server error"
    }
    ```
### PATCH /api/appointments/:id
#### Description
- Edit appointment by id

#### Request
- Headers
    ```json
    {
      "Authorization": Bearer <access_token>
    }
- Body
    ```json
    {
    "userId": integer,
    "doctorId":integer,
    "time": date,
    "description":string
    }
    
#### Response
_200 - Ok

- Body
    ```json
    {
        "statusCode": 200,
        "message": "Appointment updated successfully"
    }
    ```

_404 - Not Found_
- Body
    ```json
    {
        "error": "Appointment not found"
    }
    ```

_403 - Forbidden_
- Body
    ```json
    {
        "error": "Authorization token is required"
    }
    ```

_500 - Internal Server Error_
- Body
    ```json
    {
        "error": "Internal server error"
    }
    ```






