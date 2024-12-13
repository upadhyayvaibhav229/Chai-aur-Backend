import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

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
   console.log(existedUser);
   

   if (existedUser) {
    throw new ApiError(409, "User already exists");
   }

  const avatarLocalPath =  req.files?.avatar[0]?.path;
  const coverImageLocalPath =  req.files?.coverImage[0]?.path;

  console.log(avatarLocalPath);
  console.log(coverImageLocalPath);

  // check if user already exists : username, email
  // check for images, check for avtar
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
    
  }
  // upload them to cloudinary , avatar

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  // create user object  - create entry in db
 const user = await User.create(
    {
      fullName,
      email,
      username: username.toLowerCase(),
      password,
      avatar: avatar.url || null,
      coverImage: coverImage?.url || "",
    },
    {
      fields: ["fullName", "email", "username", "password", "avatar", "coverImage"],
    }
  )
  // check for userCreation
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )
  if (!createdUser) {
    throw new ApiError(500, "Something went whilte User Creation");
    
  }

  return res.status(201).json(
    new ApiResponse(201, createdUser, "User Registered successfully")
  );
  
  // send response - remove password and refresh token field from response
  // return response
});

export { registerUser };
