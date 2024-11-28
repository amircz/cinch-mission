Here's the full README file in Markdown format with all the details you provided:

```markdown
# Email Management Project

## Overview

In this project, I implemented the core requirements and the ability to display historical email summaries.

### Explanation:
You can select a date using a date picker (allowing a range of more than 3 months as the optional task requires), and the server will fetch emails from that specific day. Each email summary is displayed in a table with columns showing the sender, date, subject, and categories that the email belongs to, which are classified using the Google Cloud Natural Language API.

### Features:
- **Date Picker:** Allows selecting any date to view emails from that specific day.
- **Email Summary Table:** Displays summaries for each email (sender, date, subject, and categories).
- **Pagination:** The table includes a pagination mechanism to avoid overloading the page when there are many emails.
- **Pie Chart:** Below the table, a pie chart shows the email distribution by categories. The chart updates dynamically according to the selected date.

## Running the Project

### Server Setup:
1. Create a `.env` file inside the **server** directory containing the following variables:

   ```env
   MAIL_USER=<YOUR_EMAIL_ADDRESS>  # Email address you want to use
   MAIL_PASSWORD=<YOUR_EMAIL_PASSWORD>  # Your email password (for Gmail, create an app password)
   MAIL_HOST=<MAIL_SERVER_HOST>  # For example, imap.gmail.com for Gmail
   MAIL_PORT=993  # Port for the mail server (993 for secure IMAP)
   GOOGLE_APPLICATION_CREDENTIALS=<PATH_TO_YOUR_GOOGLE_SERVICE_ACCOUNT_JSON>  # Path to your Google service account JSON file
   ```

2. After creating the `.env` file, run the following command in the terminal to start the server:

   ```bash
   npm start
   ```

### Client Setup:
1. Create a `.env` file inside the **client** directory containing the following variables:

   ```env
   REACT_APP_API_URL=http://localhost:3001  # Server URL for the API
   REACT_APP_CATEGORIZED_MAILS_SUFFIX=/mails/categorized  # Endpoint to fetch categorized mails
   REACT_APP_MAILS_PAGE_SIZE=10  # Number of emails to display per page (adjustable)
   ```

2. After creating the `.env` file, run the following command in the terminal to start the client:

   ```bash
   npm start
   ```

## Notes:
- The email table uses pagination to avoid overloading the page with a large number of emails.
- The pie chart below the table is dynamically updated based on the selected date and categorizes the emails accordingly.

## Thank you!
