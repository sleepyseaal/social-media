const AppError = require("../utils/AppError");
const prisma = require("../config/prisma");

async function getUser(req, res, next) {
  const { userName } = req.params;
  const requestPath = req.route.path;

  try {
    const user = await prisma.User.findUnique({
      where: { username: userName },
    });

    if (!user) {
      return next(new AppError("User not found", 404, "USER_NOT_FOUND"));
    }

    const response = {
      id: user.id,
      name: user.name,
      username: user.username,
    };

    if (requestPath.includes("followers-only")) {
      response.email = user.email;
    }

    res.status(200).json({
      success: true,
      message: "User info fetched successfully",
      data: response,
    });
  } catch (err) {
    next(err);
  }
}

async function getFollowers(req, res, next) {
  const { userName } = req.params;

  try {
    const user = await prisma.User.findUnique({
      where: { username: userName },
    });

    if (!user) {
      return next(new AppError("User not found", 404, "USER_NOT_FOUND"));
    }

    const followers = await prisma.follow.findMany({
      where: { followerID: user.id },
    });

    const followersIds = followers.map((follower) => follower.followerID);

    const followersData = await prisma.User.findMany({
      where: {
        id: { in: followersIds },
      },
      select: {
        id: true,
        username: true,
        name: true,
      },
    });

    const data = followersData.map((follower) => {
      return {
        id: follower.id,
        name: follower.name,
        username: follower.username,
      };
    });

    res.status(200).json({
      success: true,
      message: "Followers fetched successfully",
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function followUser(req, res, next) {
  try {
    const loggedInUserId = req.user.id;
    const { userName } = req.params;

    const userToFollow = await prisma.user.findUnique({
      where: { username: userName },
    });

    if (!userToFollow) {
      return next(
        new AppError("User to follow not found", 404, "USER_NOT_FOUND")
      );
    }

    if (userToFollow.id === loggedInUserId) {
      return next(
        new AppError("You cannot follow yourself", 400, "BAD_REQUEST")
      );
    }

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerID_followingID: {
          followerID: loggedInUserId,
          followingID: userToFollow.id,
        },
      },
    });

    if (existingFollow) {
      await prisma.follow.delete({
        where: {
          followerID_followingID: {
            followerID: loggedInUserId,
            followingID: userToFollow.id,
          },
        },
      });
      return res.status(200).json({
        success: true,
        message: `You are no longer following ${userName}`,
        data: { following: false },
      });
    }

    await prisma.follow.create({
      data: {
        followerID: loggedInUserId,
        followingID: userToFollow.id,
      },
    });

    res.status(200).json({
      success: true,
      message: `You are now following ${userName}`,
      data: { following: true },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getUser, getFollowers, followUser };
