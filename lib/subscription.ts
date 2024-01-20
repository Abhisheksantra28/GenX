import { auth } from "@clerk/nextjs";
import prismaDB from "./prismaDB";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId } = auth();
  if (!userId) {
    return false;
  }

  const userSubscription = await prismaDB.userSubcription.findUnique({
    where: {
      userId,
    },
    // select: {
    //   stripeSubscriptionId: true,
    //   stripeCurrentPeriodEnd: true,
    //   stripePriceId: true,
    //   stripeCustomerId: true,
    // },
  });

  if (!userSubscription) return false;

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid; // this ensures that isvalid always a boolean
};
