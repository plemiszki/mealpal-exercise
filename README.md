# MealPal Code Exercise

## Product Brief

Thanks for helping us out! We are building a product to help restaurants with recording the full name and phone number for every restaurant guest.

We would like you to complete the feature below by:

1 - Setting up a component in React to submit full name and phone number with the acceptance criteria below:

- If a user enters a full name (min. two words) and a valid phone number (10 or 11 digits), they should see the success screen with their name.
- If a user enters a name that has less than two words, they should see an error message (* must be your first and last name)
- If a user enters a phone number that is invalid, they should see an error message (* numbers only (ex. 1231231234))

Please check out designs file in the root folder.

2 - Create the API endpoint in Rails to receive the data and validate entry before storing it
- If a user submits a valid entry, the API should return a 201 OK response and store the user data in the DB
- If a user submits an invalid entry, the API should return a 400 response and not store the user data in the DB

## Technical Details

Please keep it as simple as possible. We favor simple and pragmatic solutions over complicated ones. Use tests where you feel is necessary to make sure the solution works. Follow designs but don't focus on getting a pixel perfect solution. The objective of this exercise is to see how you build the feature more than how good your css skills are.

To submit your response, just compress the whole repository in a .zip file with your name and reply to the email that you have received this into.

## Starting the Application

```
bundle install
yarn build
rails server -p 3000
```

## Accessing the server

```
open http://localhost:3000/
```
