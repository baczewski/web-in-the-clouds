# Homework documentation

## The homework consists of 3 functionalities:

    - note insertion
    - note modification
    - note deletion

## There is an endpoint for each functionality:

    - /notes
        - type: POST
        - accepts: title: string, description: string. as body
        - functionality: inserts a note

    - /notes/:id 
        - type: DELETE
        - accepts: id: number. as query parameter
        - functionality: deletes an existing note, if any

    - /notes/:id
        - type: PATCH
        - accepts: id: number. as query parameter
        - functionality: modifies an existing note, if any

    - /notes/:id 
        - type: GET
        - accepts: id: number. as query parameter
        - functionality: retrieves an existing note, if any

## Steps to start the project
    
    1. npm run build: builds the project
    2. npm run start: starts the project