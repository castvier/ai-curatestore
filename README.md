# Educational Content Generator

This project integrates React with Node.js to create an educational content generator using the OpenAI API. It allows users to input a prompt and select a difficulty level for generating educational content dynamically.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [API](#api)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Documentation](#documentation)
- [Contributors](#contributors)
- [License](#license)

## Installation

To set up this project on your local machine, follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies.

    ```
    git clone [repository-url]
    cd [repository-directory]
    npm install
    ```

3. Change into the server directory to configure the environment variables and start the server. For Zsh users:

    ```
    cd server
    export OPENAI_API_KEY='your-openai-api-key'
    ```

    For persistent environment variables in Zsh, add the export line to your `.zshrc` file:

    ```
    echo "export OPENAI_API_KEY='your-openai-api-key'" >> ~/.zshrc
    source ~/.zshrc
    ```

4. Install dependencies in the server if separate from the root:

    ```
    npm install
    ```

5. Start the server.

    ```
    node app.js
    ```

6. In a new terminal window, navigate to the frontend directory.

    ```
    cd react/frontend
    npm install
    ```

## Usage

Once you have completed the installation steps:

1. Ensure the server is running as described in the installation section.

2. In a new terminal, start the frontend React application:

    ```
    npm start
    ```

This command will run the React application in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload if you make edits, and you will also see any lint errors in the console.

## Features

- **Content Generation**: Generate custom content based on user inputs and selected tones.
- **Code Generation**: Automatically generate code snippets based on prompts.
- **Educational Content**: Generate educational content tailored to different difficulty levels.

## API

The backend API supports three endpoints:

- `POST /api/generate_content`: Generates content based on a given prompt and tone.
- `POST /api/generate_code`: Generates code from a user-provided prompt.
- `POST /api/generate_educational_content`: Generates educational content based on the difficulty level and prompt.

## Dependencies

- **React**: For building the user interface.
- **Express**: To handle HTTP requests on the server side.
- **Cors**: To enable CORS for cross-origin request handling.
- **Body-parser**: To parse incoming request bodies in middleware.
- **Axios**: For making HTTP requests from the frontend.
- **OpenAI**: OpenAI's JavaScript SDK to interact with the OpenAI API.

## Configuration

Ensure you have an API key from OpenAI. This key needs to be set in your environment variables as `OPENAI_API_KEY` to authenticate requests to OpenAI services.

## Documentation

For detailed information about the components and services used in this project, visit:

- [React documentation](https://reactjs.org/)
- [Node.js documentation](https://nodejs.org/en/docs/)
- [OpenAI API documentation](https://beta.openai.com/docs/)

## Contributors

List of contributors and their contact information.

## License

Specify the license under which the project is available. Common licenses include MIT, GPL, and Apache.
