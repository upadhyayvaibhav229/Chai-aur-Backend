import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
const registerUser = asyncHandler(async (req, res) => {
  // get user detail from fronted

  const { fullName, email, username, password } = req.body;
//   console.log("email: ", email);

  // Validation: Check if fields are not empty
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Validation: Check if email contains "@"
  if (!email.includes("@")) {
    throw new ApiError(400, "Invalid email");
  }

  // If all validations pass, proceed with user creation
  res.status(200).json({ message: "Valid Input, proceed with registration" });

 const existedUser = await user.findOne({ 
    $or: [
        { email: email },
        { username: username }
    ]
   })

   if (existedUser) {
    throw new ApiError(409, "User already exists");
   }
  

  // check if user already exists : username, email
  // check for images, check for avtar
  // upload them to cloudinary , avatar
  // create user object  - create entry in db
  // send response - remove password and refresh token field from response
  // check for userCreation
  // return response
});

export { registerUser };
