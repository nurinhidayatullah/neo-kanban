# KANBAN BOARD APP


# Register User

Return JSON data about success register information

- ## URL

    /register

- ## Method:

    POST

- ## Request Body
    ```
    {
        "email": "joni@mail.com",
        "password": "secret",
        "organization": "" ==> default for Hacktiv8
    }
    ```

- ## Success Response:

    Code: 201 CREATED
    ```
    {
        {
            "id": 10,
            "email": "jakut@mail.com"
        }
    }
    ```

- ## Error Response:

    Code: 400 BAD REQUEST
    ```
    Content: { 
            err : "Please input an email" 
        }   
    ```
    
    OR
    
    Code: 500 INTERNAL SERVER ERROR
    ```
    Content: { 
            err : "Internal Server Error" 
        }
    ```

# User Login

Return JSON data about user information

- ## URL

    /login

- ## Method:

    POST

- ## Request Body
    ```
    {
        "email": "jakul@mail.com",
        "password": "secret",
    }
    ```

- ## Success Response:

    Code: 200 OK
    ```
       {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.     eyJpZCI6OSwiZW1haWwiOiJqYWt1bEBtYWlsLmNvbSIsIm9yZ2FuaXphdGlvbiI6IkhhY2t0aXY4IiwiaWF0IjoxNTk3NDI4MDA5fQ.     QoWD-RpxP6EkCxNygrxTc66-6ghtrFtBOyuivvwTBxM",
            "email": "jakul@mail.com"
        }
    ```

- ## Error Response:

    Code: 400 BAD REQUEST
    ```
    Content: { 
            err : "Invalid Email or Password" 
        }   
    ```
    
    OR
    
    Code: 500 INTERNAL SERVER ERROR
    ```
    Content: { 
            err : "Internal Server Error" 
        }
    ```

# Google Login

Return JSON data about user information

- ## URL

    /googleLogin

- ## Method:

    POST

- ## Request Body
    ```
    {
        "id_token": "Google Token" 
    }
    ```

- ## Success Response:

    Code: 200 OK
    ```
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqb2huQG1haWwuY29tIiwiaWF0IjoxNTk2ODg1NTM4fQ.Mvx6SQpXY4CHbxuEGNDl-_tXKj3m0-AZaNPUn7YffU4",
            "email": "john@mail.com"
        }
    ```

- ## Error Response:
    
    Code: 500 INTERNAL SERVER ERROR
    ```
    Content: { 
            err : "Internal Server Error" 
        }
    ```


# Create Task

Returns JSON data about a single task's data and save it to database.

- ## URL

    /tasks

- ## Method:

    POST

- ## Request Header
    ```
    {
        "token": 'Your access token here'
    }
    ```

- ## Request Body
    ```
    {
        "title": STRING,
        "description": STRING,
        "category": STRING, => (backlog, todo, doing, done)
        "priority": STRING, => (critical, alarming, low, lowest)
        "due_date": DATE
    }
    ```
    

- ## Success Response:

    Code: 201 CREATED
    ```
    {
        {
            "UserId": INTEGER,
            "title": STRING,
            "description": STRING,
            "category": STRING, => (backlog, todo, doing, done)
            "priority": STRING, => (critical, alarming, low, lowest)
            "due_date": DATE
        }
    }
    ```

- ## Error Response:

    Code: 400 BAD REQUEST
    ```
    Content: { 
            err : "Date must this day or after" 
        }   
    ```

    OR
    
    Code: 500 INTERNAL SERVER ERROR
    ```
    Content: { 
            err : "Internal Server Error" 
        }
    ```

# Show All Task by Organization

Returns JSON data of All task's data by Organization.

- ## URL

    /tasks

- ## Method:

    GET

- ## Request Header
    ```
    {
        "token": 'Your access token here'
    }
    ```

- ## Request Body
    none

- ## Success Response:

    Code: 200 OK
    ```
    {
         "tasks": [
                    {
                        "id": 7,
                        "UserId": 1,
                        "title": "Bagayaro",
                        "description": "jangan begadang kalau tiada artinya",
                        "category": "doing",
                        "priority": "critical",
                        "due_date": "2020-12-11T17:00:00.000Z",
                        "User": {
                            "id": 1,
                            "email": "khan@mail.com",
                            "password": "$2a$10$X/LnlF/eQeyU6CF8sJwrdekMkCf8Y3NO0sAuGFowrj42ileZpLMvK",
                            "organization": "Hacktiv8",
                            "createdAt": "2020-08-14T06:31:39.534Z",
                            "updatedAt": "2020-08-14T06:31:39.534Z"
                        }
                    },
                ]
    }
    ```

- ## Error Response:

    Code: 500 INTERNAL SERVER ERROR
    ```
    Content: { 
            err : "Internal Server Error" 
        }
    ```

# Get Category

Returns JSON data about a category property data.

- ## URL

    /categories

- ## Method:

    GET

- ## Request Header
    ```
    {
        "token": 'Your access token here'
    }
    ```
- ## Request Body
    none


- ## Success Response:

    Code: 200 OK
    ```
    {{
        "categories": [
            {
                "id": 1,
                "name": "backlog",
                "img": "../images/backlog.png",
                "organization": "<==++all++==>",
                "createdAt": "2020-08-14T06:22:01.653Z",
                "updatedAt": "2020-08-14T06:22:01.653Z"
            },
            {
                "id": 2,
                "name": "todo",
                "img": "../images/to-do.png",
                "organization": "<==++all++==>",
                "createdAt": "2020-08-14T06:22:01.653Z",
                "updatedAt": "2020-08-14T06:22:01.653Z"
            },
            {
                "id": 3,
                "name": "doing",
                "img": "../images/process.png",
                "organization": "<==++all++==>",
                "createdAt": "2020-08-14T06:22:01.653Z",
                "updatedAt": "2020-08-14T06:22:01.653Z"
            },
            {
                "id": 4,
                "name": "done",
                "img": "../images/done.png",
                "organization": "<==++all++==>",
                "createdAt": "2020-08-14T06:22:01.653Z",
                "updatedAt": "2020-08-14T06:22:01.653Z"
            }
        ]
    }
    ```

- ## Error Response:

    Code: 404 ERROR NOT FOUND
    ```
    Content: { 
            err : "task not found" 
        }   
    ```
    
    OR
    
    Code: 500 INTERNAL SERVER ERROR
    ```
    Content: { 
            err : "Internal Server Error" 
        }
    ```

# Update Task

Returns JSON data about success update data.

- ## URL

    /tasks/:id

- ## Method:

    PUT

- ## URL Params
    Required:
    ```
    id = [integer]
    ```

- ## Request Header
    ```
    {
        "token": 'Your access token here'
    }
    ```

- ## Request Body
    ```
    {
        "title": STRING,
        "description": STRING,
        "category": STRING, => (backlog, todo, doing, done)
        "priority": STRING, => (critical, alarming, low, lowest)
        "due_date": DATE
    }
    ```
    

- ## Success Response:

    Code: 200 OK
    ```
    {
        {
            msg: 'succes update task
        }
    }
    ```

- ## Error Response:

    Code: 404 ERROR NOT FOUND
    ```
    Content: { 
            err : "task not found" 
        }   
    ```
    
    OR

    Code: 400 BAD REQUEST
    ```
    Content: { 
            err : "Date must this day or after" 
        }   
    ```
    
    OR
    
    Code: 500 INTERNAL SERVER ERROR
    ```
    Content: { 
            err : "Internal Server Error" 
        }
    ```
# Delete Tasks

Returns JSON data about success delete data.

- ## URL

    /tasks/:id

- ## Method:

    DELETE

- ## URL Params
    Required:
    ```
    id = [integer]
    ```  

- ## Request Header
    ```
    {
        "token": 'Your access token here'
    }
    ```

- ## Success Response:

    Code: 200 OK
    ```
    {
        {
            msg: 'Delete success'
        }
    }
    ```

- ## Error Response:

    Code: 404 ERROR NOT FOUND
    ```
    Content: { 
            err : "Task not found" 
        }   
    ```
    
    OR
    
    Code: 500 INTERNAL SERVER ERROR
    ```
    Content: { 
            err : "Internal Server Error" 
        }
    ```

# Update Category in task

Returns JSON data about success update data.

- ## URL

    /tasks/category/:id

- ## Method:

    PUT

- ## URL Params
    Required:
    ```
    id = [integer]
    ```

- ## Request Header
    ```
    {
        "token": 'Your access token here'
    }
    ```

- ## Request Body
    ```
    {
        "category": STRING, => (backlog, todo, doing, done)
    }
    ```
    

- ## Success Response:

    Code: 200 OK
    ```
    {
        {
            msg: 'succes update task
        }
    }
    ```

- ## Error Response:

    Code: 404 ERROR NOT FOUND
    ```
    Content: { 
            err : "task not found" 
        }   
    ```
    
    OR
    
    Code: 500 INTERNAL SERVER ERROR
    ```
    Content: { 
            err : "Internal Server Error" 
        }
    ```

