# Binary Blogs

 A web application that allows users to create and manage their own blogs. This README file provides an overview of the application and instructions for setting it up and running it locally.

## Features

The Blog App offers the following features:

1. User Registration: Users can create an account to access the application and manage their blogs.
2. Blog Creation: Users can create their own blogs by providing a title, content, and optional tags.
3. Blog Management: Users can view, edit, and delete their own blogs.
4. Search and Filter: Users can search for blogs based on keywords or filter blogs based on tags.
5. User Authentication: The application provides secure authentication mechanisms to protect user accounts and data.


## Run using docker
To run the application using docker prepare [env.list](./env.list) filr and run `bash start_app.sh` from root of the repo.

## Setup Instructions

To set up the Blog App locally, follow these steps:

1. Clone the repository:
2. Navigate to the project directory:
3. cd into backend directory and run `poetry install`
4. fill required environment variables [example](./backend/env.example) and rename it to `.env`
5. Start the backend application by running `gunicorn`
6. cd into frontend directory and run `npm install`
7. serve the frontent with `ng serve`
6. Access the application at `http://localhost:4200` 


## Technologies Used

The Blog App is built using the following technologies:

- Angular
- Django
- Django Rest Framework
- HTML/LESS
- JavaScript

## Contributing

Contributions to the Blog App are welcome! If you'd like to contribute, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature/fix.
3. Commit your changes with descriptive commit messages.
4. Push your changes to your forked repository.
5. Submit a pull request explaining your changes.

## License

The Blog App is open-source and released under the [MIT License](LICENSE).

## Contact

For any inquiries or support, please contact the project maintainer at `alquamasalim000@gmail.com`.
