# Products Page with JavaScript and JSON API

This project is a dynamic product listing page built using **core JavaScript fundamentals**. It fetches product data from a public JSON API and renders product cards in the browser using **DOM manipulation** and **asynchronous JavaScript**.

The goal of this project is to understand real-world frontend workflows **without using any frameworks or libraries**.

---

## Technologies Used

- HTML5
- JavaScript (ES6+)
- Tailwind CSS (CDN)
- Public JSON API

---

## Features

- Fetches product data from a public API
- Uses `async/await` for asynchronous operations
- Displays a loading state while data is being fetched
- Dynamically renders product cards using pure DOM manipulation
- Shows product title, price, stock, and rating
- Clean and responsive layout using Tailwind CSS
- Basic error handling for failed API requests

---

## Concepts Covered

- Fetch API
- Async / Await
- DOM manipulation
- `forEach` loop for rendering product lists
- JavaScript ES6+ syntax
- Basic error handling

---

## Project Structure

project-root/
│── index.html
│── script.js
│── README.md


---

## How It Works

1. The application sends a request to a products JSON API.
2. A loading message is displayed while the data is being fetched.
3. Once the response is received, products are looped using `forEach`.
4. Each product is rendered as a card with price, stock, and rating.
5. Errors are handled gracefully without breaking the UI.

---

## Purpose

This project was built as a **practice exercise** to strengthen JavaScript and frontend fundamentals before moving to frameworks like **React or Next.js**. It demonstrates how APIs, asynchronous logic, and DOM rendering work together in real-world scenarios using only vanilla JavaScript.

---

## Possible Improvements

- Add pagination or “Load More” functionality
- Improve UI and card layout
- Add product images and categories
- Implement search and filtering
- Convert the project to React or Next.js

---

## Author

**Nasir Sarker**  
Frontend Web Developer
