import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismaDB from "@/lib/prismaDB";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingUrl = absoluteUrl("/settings");

export const GET = async () => {
  try {
    const { userId } = auth();
    const user = await currentUser();

    // Check if user is authenticated
    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Fetch user subscription details
    const userSubscription = await prismaDB.userSubcription.findUnique({
      where: {
        userId,
      },
    });

    // Check if user is on a paid plan
    if (userSubscription && userSubscription.stripeCustomerId) {
      // Create a portal session to manage subscription
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingUrl,
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    // User is on a free plan - Create a checkout session to upgrade
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingUrl,
      cancel_url: settingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "GenX Pro",
              description: "Unleash Limitless AI Potential.",
            },
            unit_amount: 400,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],

      metadata: {
        userId,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    // Log the error and return a more specific error message
    console.error("Error in Stripe checkout session creation: ", error);
    return new NextResponse(
      "Internal server error in stripe checkout session creation",
      { status: 500 }
    );
  }
};
