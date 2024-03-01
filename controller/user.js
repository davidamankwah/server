import User from "../models/User.js";


export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFollowers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const followers = await Promise.all(
      user.followers.map((id) => User.findById(id))
    );
    const formattedFollowers = followers.map(
      ({ _id, userName, picturePath }) => {
        return { _id, userName, picturePath };
      }
    );
    res.status(200).json(formattedFollowers);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addOrRemoveFollowers = async (req, res) => {
  try {
    const { id, followerId: followerId } = req.params;
    const user = await User.findById(id);
    const follower = await User.findById(followerId);

    if (user.followers.includes(followerId)) {
      user.followers = user.followers.filter((id) => id !== followerId);
      follower.followers = follower.followers.filter((id) => id !== id);
    } else {
      user.followers.push(followerId);
      follower.followers.push(id);
    }
    await user.save();
    await follower.save();

    const followers = await Promise.all(
      user.followers.map((id) => User.findById(id))
    );
    const formattedFollowers = followers.map(
      ({ _id, userName, picturePath }) => {
        return { _id, userName, picturePath };
      }
    );

    res.status(200).json(formattedFollowers);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getRecommendedUsers = async (req, res) => {
  try {
    // Exclude the current user and users the current user is already following
    const { _id, followers } = req.user;
    const recommendedUsers = await User.find({
      _id: { $ne: _id, $nin: followers },
    }).limit(4); // Limit the number of recommended users

    res.status(200).json(recommendedUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller function for user search
export const searchUsers = async (req, res) => {
  try {
    const { query } = req.params;
    console.log('Search Query:', query);

    // Use a case-insensitive regular expression to perform the search
    const users = await User.find({
      userName: { $regex: new RegExp(query, 'i') },
    });

    console.log('Search Result:', users);

    res.status(200).json(users);
  } catch (error) {
    console.error('Error in searchUsers:', error);
    res.status(500).json({ error: error.message });
  }
};
