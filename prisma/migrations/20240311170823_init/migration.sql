-- CreateTable
CREATE TABLE "UserAPILimit" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAPILimit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSubcription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripe_customer_id" TEXT,
    "stripe_subscription_id" TEXT,
    "stripe_price_id" TEXT,
    "stripe_current_period_end" TIMESTAMP(3),

    CONSTRAINT "UserSubcription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAPILimit_userId_key" ON "UserAPILimit"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubcription_userId_key" ON "UserSubcription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubcription_stripe_customer_id_key" ON "UserSubcription"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubcription_stripe_subscription_id_key" ON "UserSubcription"("stripe_subscription_id");
