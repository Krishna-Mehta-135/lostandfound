# 🎒 Lost & Found Portal

A full-stack web application that helps users find their lost items or report found items in a college campus or any public space.

---

## 🚀 Features

- 🔍 Search lost items using item type or description  
- 🔔 Get notified via email when an item from your selected category is found  
- 📝 Submit found item with images and verification questions  
- 👀 View item details securely before claiming  
- 📬 Claim item with contact details and answers to verification questions  
- ✅ Admin dashboard to approve/reject claims  
- 🔐 JWT-based Authentication  
- 📧 Email notifications for new item matches and claim updates  

---

## ⚙️ How It Works

1. Users can search for items using keywords.  
2. If they don’t find their item, they can subscribe for email alerts by selecting a category (e.g., "Electronics").  
3. Users who find items can submit them with photos and verification questions.  
4. Other users can then claim these items by answering the questions and entering their details.  
5. The admin panel lets owners approve or reject these claims.  
6. All major actions (like new match, claim approval) trigger emails.

---

## 🔧 Tech Stack

### Frontend:
- React.js  
- Tailwind CSS  
- ShadCN UI  
- Axios  

### Backend:
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- Cloudinary (for image storage)  
- Gmail SMTP (for sending emails)  
- JWT (for login sessions)  

---

## 📬 Email Notifications

The app sends transactional emails through Gmail SMTP, including:
- ✅ Confirmation when a user subscribes for item notifications  
- 📩 Alerts when a matching item is found  
- 📬 Updates when a claim is approved or rejected  

⚠️ *Make sure to enable "Less secure app access" or set up an App Password for Gmail to allow email sending from your backend.*

---

## 🙌 Contribution

Feel free to fork and improve! Pull requests are welcome.  
Built with ❤️ by [Ritesh](https://github.com/Ritesh-251) and [Krishna](https://github.com/Krishna-Mehta-135) to help people find their stuff easily.
