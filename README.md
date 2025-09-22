## Setup Instructions:

After copying files to local, in bash use 'npm install', then 'npm run dev'.
Open browser and navigate to prompted locaton (e.g. http://localhost:5173/admin).

(See backend README.md for instructions for backend setup.)

## Description:

CRUD on the MERN stack.

## Frontend deploy:

Repository:  This repository
Deploy: https://two025-09-12-capstone-front.onrender.com/

## Backend:
Repository:  https://github.com/aardvarkpepper/2025-09-12-Capstone-Back
Deploy:  https://two025-09-12-capstone-back-2.onrender.com

## Backend API Endpoints:

| Operation | Path | Function |
| --- | --- |---|
| POST | /register | Registers user |
| POST | /login | Logs user in |

### Must be logged in as admin to use following:

| Operation | Path | Function |
| --- | --- |---|
| GET | /admin/users | Lists all users |
| PUT | /admin/users/:id | Edits a specific user's info |
| DELETE | /admin/users/:id | Deletes a specific user |
| GET | /admin/ools | Lists all Order Of Losses |
| POST | /admin/ools | Create a new Order of Loss |
| PUT | /admin/ools/:id | Edit a specific Order Of Loss |
| DELETE | /admin/ools/:id | Delete a specific Order of Loss |
| GET | /admin/userlinks | Lists all userlinks |
| PUT | /admin/userlinks/:id | Edits a specific userlink |
| DELETE | /admin/userlinks/:id | Deletes a specific userlink

### Must be logged in as sub to use following:

| Operation | Path | Function |
| --- | --- |---|
| PUT | /subs/users/:id | Edit your user profile |
| DELETE | /subs/users/:id | Delete your user profile (yes, really) |
| GET | /subs/ools | Get your Order Of Losses |
| POST | /subs/ools | Create an Order of Loss |