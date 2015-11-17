# prime_address_order_application
Instructions
You will be building out an address and order viewing application using the full stack and an SQL database. Both parts take advantage of one-to-many relationships in the data to be efficient.

You’ll need to use much of what you’ve learned to-date in order to complete it. Don’t worry, however. While this is a solo project, it is open. You can make use of your classmates and other resources however you’d like. You can use previous code or choose to build it all from scratch.

Set-up the Database
Be sure to read the comments in this file!
Create a New Postgres Database in PgAdmin
Take the attached SQL file and update it where it asks (your name, add 2 addresses for yourself, uncomment the orders insert lines)
Copy the SQL from the attached file and run it against this database in PgAdmin. 
You will now have a good place to work from.

Application Requirements
Build out 2 complete views using Angular Route Provider and partials. These views will be used to display information for the selected user of the system. Each will need to get data from the server based on user action.

View 1: Address Display
Drop down/select list of all users
When one is selected, display all of their addresses
Format the addresses nicely like a real address with line breaks, spaces, etc.

View 2: Order Lookup by Date
Drop down/select list of all users
Input fields for Start Date and End Date
When one is selected, display all of the orders for this user within the date range given in a table. Also blow out the data to display:
All orders fields
Include address street, city, state, and zip for that order
Include user’s name
Sum the total amount spent at the bottom for only the selected orders
Make sure the amount fields have a dollar sign and proper commas and formatting
