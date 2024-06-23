# VidManager

VidManager is a platform that allows YouTubers to collaborate with managers to streamline the process of creating, reviewing, and uploading video drafts. This project addresses security concerns by using OAuth 2.0 tokens and ensuring that managers can only create drafts, which must be approved by the YouTuber before being uploaded to YouTube.

## Features

- **OAuth 2.0 Integration**: Secure authentication using OAuth 2.0 tokens.
- **YouTube Data API**: Integration for managing video drafts and uploads.
- **Notification System**: Email notifications for draft reviews and uploads using Nodemailer.
- **Role-Based Access**: Separate roles for YouTubers and managers to ensure secure and efficient collaboration.

## Project Structure

The project consists of two main parts:
1. **Server**: A Node.js Express application.
2. **Frontend**: A Vite project built with React and Tailwind CSS.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- YouTube Data API credentials
- SMTP server credentials for Nodemailer

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/yourusername/vidmanager.git
cd vidmanager
```

## Server Setup

### Installation

1. Navigate to the server directory:

    ```bash
    cd server
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

### Configuration

1. Create a `.env` file in the server directory and add your environment variables:

    ```plaintext
    PORT=5000
    YOUTUBE_CLIENT_ID=your_youtube_client_id
    YOUTUBE_CLIENT_SECRET=your_youtube_client_secret
    YOUTUBE_REDIRECT_URI=your_youtube_redirect_uri
    SMTP_HOST=your_smtp_host
    SMTP_PORT=your_smtp_port
    SMTP_USER=your_smtp_user
    SMTP_PASS=your_smtp_pass
    ```

### Running the Server

```bash
npm start
```

The server should now be running on `http://localhost:5000`.

## Frontend Setup

### Installation

1. Navigate to the frontend directory:

    ```bash
    cd ../frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

### Configuration

1. Create a `.env` file in the frontend directory and add your environment variables:

    ```plaintext
    VITE_API_URL=http://localhost:5000
    ```

### Running the Frontend

```bash
npm run dev
```

The frontend should now be running on `http://localhost:3000`.

## Usage

- **YouTuber**: Log in, review drafts, suggest changes, and approve drafts for upload.
- **Manager**: Log in, create video drafts, and receive notifications about draft reviews and uploads.

### Notifications

- Email notifications are sent using Nodemailer for:
  - New drafts created by managers
  - Drafts reviewed or uploaded by YouTubers

## Technologies Used

- **Backend**: Node.js, Express, OAuth 2.0, Nodemailer
- **Frontend**: Vite, React, Tailwind CSS, Shadcn UI for sliders

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.


## Contact

For any questions or inquiries, please contact kpparekh81602@gmail.com.

---

Enjoy using VidManager! Streamline your YouTube workflow with ease and security.
