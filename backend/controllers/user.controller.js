import User from './../models/user.model.js';

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    
    const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select('-password');
    // find every user in the database the one that is not equal to the logged in user the reason for that is when we display the users in the left hand side in the sidebar we really want to see all the users except ourselves
   
    res.status(200).json(filteredUsers);

  } catch (error) {
    console.error("Error in getUsersForSidebar controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
