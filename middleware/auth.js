// Import the 'jsonwebtoken' library
import jwt from "jsonwebtoken";

// Middleware function to verify a JWT token
export const checkToken = async (req, res, next) => {
try {
    // Extract the token from the "Permitted" header
    let token = req.header("Permitted");

    // Check if the token is missing
    if (!token) {
        return res.status(403).send("Access Decline"); // Return a 403 Forbidden response if the token is missing
      }

      // Check if the token starts with "Bearer "
      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimLeft(); // Remove "Bearer " from the token
      }

    // Verify the token using the JWT_SECRET from the environment variables
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the verified user information to the request object
    req.user = verified;

     // Call the next middleware in the chain
    next();
      
} catch (err) {
    // Handle any errors that occur during token verification
    res.status(500).json({ error: err.message }); // Return a 500 Internal Server Error response with the error message
}
};