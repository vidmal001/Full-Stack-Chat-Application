import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  // Generate a JWT token using the user's ID as the payload and a secret key. The token will be valid for 15 days.
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d", // Token expires in 15 days
  });

  // Set the JWT token in an HTTP-only cookie to prevent client-side access (e.g., via JavaScript).
  // you are telling the server to attach a cookie (in this case, the JWT token) to the HTTP response that will be sent back to the browser
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // Cookie expires after 15 days (in milliseconds)
    httpOnly: true, // The cookie is accessible only by the server to protect against XSS (cross-site scripting) attacks.
    sameSite: "strict", // Ensures the cookie is only sent with requests from the same domain to mitigate CSRF (cross-site request forgery) attacks.
    secure: process.env.NODE_ENV !== "development", // The cookie is only sent over HTTPS if the server is running in production.
  });
};

export default generateTokenAndSetCookie;

// A token (in this case, a JWT - JSON Web Token) is a small, encrypted piece of data that is used to verify a user's identity when they make requests to a server. Think of it like a digital ID card. Once you’re logged in, instead of asking for your username and password for every action, the server just looks at your token to confirm that you’re authenticated.

// A cookie is a small piece of data that a server sends to your browser. The browser stores this data, and every time you visit the website again or send requests (like navigating between pages), it sends the cookie back to the server.In this case, we are storing the token inside the cookie, so the token travels with every request automatically.

/**

1.User Signs Up:

User provides details (username, password).
Server validates and generates a token (JWT).

2.Token Stored in Cookie:

The server sends the token back to the browser in an HTTP-only cookie.
The browser stores this cookie securely.

3.Automatic Sending:

Every time the user makes a request to the server (like clicking a link), the browser automatically includes the cookie with the token.

4.Server Verification:

The server checks the token in the cookie:
If valid, it allows the requested action (like accessing user data).
If invalid or expired, the server denies access.

5.Token Expiration:

The token has an expiration time (e.g., 15 days).
After expiration, the user must log in again to get a new token.

6.User Logs Out:

When the user logs out, the server clears the cookie, making the token invalid.
*/