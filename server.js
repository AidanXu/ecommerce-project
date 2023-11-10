const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const mongoose = require("mongoose");

const mongoDBAtlasUri =
  "mongodb+srv://aidanxu:VEnR34luKLWDUHml@cluster0.0kszzqv.mongodb.net/myGoogleAuthApp?retryWrites=true&w=majority";

mongoose
  .connect(mongoDBAtlasUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Create a user schema and model
const userSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  firstName: String,
  lastName: String,
  email: String,
  profilePhoto: String,
});

const User = mongoose.model("User", userSchema);

const app = express();

const GOOGLE_CLIENT_ID =
  "325812538409-2abgj5cleh32abl5mf4rsgdv0qj924mh.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

// Passport setup
passport.serializeUser((user, done) => {
  done(null, user); // Serialize the entire user object
});

passport.deserializeUser((obj, done) => {
  done(null, obj); // Deserialize the user object
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          done(null, user);
        } else {
          user = await User.create({
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            profilePhoto: profile.photos[0].value,
          });

          done(null, user);
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

// Set up session handling
app.use(
  session({
    secret: "your-session-secret", // Replace with a real secret key
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html"); // make sure you have index.html in the right directory
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect home
    res.redirect("/profile");
  }
);

app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    // Check if user is authenticated
    // Assuming the user object has a 'displayName' property
    res.send(
      `Welcome, your ID is: ${req.user.id}, your name is: ${req.user.displayName}`
    );
  } else {
    res.send("Please login using Google.");
  }
});

app.get("/logout", (req, res) => {
  req.logout(); // Passport provides this method to log out the user
  req.session.destroy(); // Destroy session data
  res.redirect("/");
});

app.get("/login", (req, res) => {
  res.send("Login failed, please try again.");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
