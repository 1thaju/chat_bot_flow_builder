# Chatbot Flow Builder

This project is a simple Chatbot Flow Builder application built using React and `reactflow.dev`. It allows users to create and connect message nodes to define a chatbot's conversation flow. The application is designed to be extensible, allowing for easy addition of new node types in the future.

## Features

1.  **Text Node:**
    *   The flow builder currently supports only one type of message: a Text Message.
    *   Multiple Text Nodes can be added to a single flow.
    *   Nodes are added by dragging and dropping them from the Nodes Panel onto the flow canvas.

2.  **Nodes Panel:**
    *   Located on the right side, this panel houses all supported node types. Currently, it only contains the "Message" node.
    *   The design of this section is extensible to accommodate future node types.

3.  **Edge:**
    *   Connects two Nodes together, defining the flow of conversation.

4.  **Source Handle:**
    *   The origin point of a connecting edge on a node.
    *   Each source handle can only have **one** edge originating from it.

5.  **Target Handle:**
    *   The destination point of a connecting edge on a node.
    *   Multiple edges can connect to a single target handle.

6.  **Settings Panel:**
    *   This panel replaces the Nodes Panel when a node is selected on the canvas.
    *   It features a text field that allows users to edit the text content of the selected Text Node in real-time.

7.  **Save Button:**
    *   A button to save the current flow configuration.
    *   **Validation:** If there are more than one nodes on the canvas and more than one node has no outgoing edges (empty target handles, meaning they don't lead anywhere), pressing the Save button will display an error message "Cannot save Flow". Otherwise, it will indicate "Flow saved successfully!".

## Technologies Used

*   **React:** A JavaScript library for building user interfaces.
*   **Vite:** A fast build tool for modern web projects.
*   **React Flow:** A library for building node-based editors.

## Setup and Running Locally

To set up and run the project on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_GITHUB_REPO_URL_HERE]
    cd BiteSpeed/client
    ```
2.  **Install Node.js:**
    Ensure you have Node.js version `20.19.0` or `22.12.0` (LTS) or higher installed. You can use a Node Version Manager (like `nvm-windows` for Windows or `nvm` for macOS/Linux) to easily manage Node.js versions.
    *   Check your Node.js version: `node -v`
3.  **Install dependencies:**
    Navigate to the `client` directory and install the project dependencies:
    ```bash
    npm install
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will typically be accessible at `http://localhost:5173/` or a similar port.

## Deployment

**[Add your deployment instructions here, e.g., for Vercel or Heroku]**
Example:
This project can be deployed using services like Vercel. After linking your GitHub repository, Vercel will automatically detect the Vite project and deploy it.

**Live Demo:**
[Add your live demo link here]

## GitHub Repository

The code for this project is hosted on GitHub:
[Add your GitHub repository link here]
