import { auth } from "@clerk/nextjs";
import prismaDB from "./prismaDB";
import { MAX_FREE_COUNTS } from "@/constants";

export const increaseAPILimit = async () => {
  const { userId } = auth();

  if (!userId) return;

  const userAPILimit = await prismaDB.userAPILimit.findUnique({
    where: {
      userId:userId,
    },
  });

  if (!userAPILimit) {
    await prismaDB.userAPILimit.create({
      data: {
        userId:userId,
        count: 1,
      },
    });
  } else {
    await prismaDB.userAPILimit.update({
      where: { userId:userId },
      data: { count: userAPILimit?.count + 1 },
    });
  }
};

export const checkAPILimit = async () => {
  const { userId } = auth();

  if (!userId) return false;

  const userAPILimit = await prismaDB.userAPILimit.findUnique({
    where: {
      userId:userId,
    },
  });

  if (!userAPILimit || userAPILimit?.count < MAX_FREE_COUNTS) return true;
  else return false;
};
