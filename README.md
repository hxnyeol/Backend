## Setting Up Your Database Connection

This project utilizes a MongoDB database for storing data. To facilitate a secure connection to the database, you'll need to create a file named `.env` in the root directory of your project. Here's a step-by-step guide on how to set it up:

**Creating the `.env` File:**

1. **Open a Text Editor:** Launch your preferred text editor or code editor (e.g., Visual Studio Code, Sublime Text, Notepad++).
2. **Create a New File:** Within your editor, create a new file, name the file `.env` (ensure there are absolutely no extensions like `.txt` appended).
4. **Save the File:** Locate the root directory of your Express.js project, where your `package.json` file resides. Save the newly created `.env` file in this root directory.

**Adding the `MONGO_URL` Variable:**

1. **Access the `.env` File:** Open the `.env` file you just created in your text editor.
2. **Add the Variable:** Inside the file, add a single line adhering to the following format MONGO_URL="YOUR_URL from compass/cluster"
