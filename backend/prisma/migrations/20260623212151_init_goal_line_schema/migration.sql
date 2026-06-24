-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "MarketType" AS ENUM ('RESULT', 'GOALS', 'BTTS');

-- CreateEnum
CREATE TYPE "Prediction" AS ENUM ('HOME', 'AWAY', 'DRAW', 'OVER', 'UNDER', 'YES', 'NO');

-- CreateEnum
CREATE TYPE "BetStatus" AS ENUM ('PENDING', 'WON', 'LOST');

-- CreateEnum
CREATE TYPE "FixtureStatus" AS ENUM ('OPEN', 'SETTLED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "points" DOUBLE PRECISION NOT NULL DEFAULT 1000.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fixture" (
    "id" TEXT NOT NULL,
    "homeTeam" TEXT NOT NULL,
    "awayTeam" TEXT NOT NULL,
    "oddsHome" DOUBLE PRECISION NOT NULL,
    "oddsAway" DOUBLE PRECISION NOT NULL,
    "oddsDraw" DOUBLE PRECISION NOT NULL,
    "goalsTarget" DECIMAL(3,1) NOT NULL,
    "oddsOver" DOUBLE PRECISION NOT NULL,
    "oddsUnder" DOUBLE PRECISION NOT NULL,
    "oddsBttsYes" DOUBLE PRECISION NOT NULL,
    "oddsBttsNo" DOUBLE PRECISION NOT NULL,
    "status" "FixtureStatus" NOT NULL DEFAULT 'OPEN',
    "finalHomeScore" INTEGER,
    "finalAwayScore" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fixture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fixtureId" TEXT NOT NULL,
    "marketType" "MarketType" NOT NULL,
    "prediction" "Prediction" NOT NULL,
    "stake" DOUBLE PRECISION NOT NULL,
    "payout" DOUBLE PRECISION NOT NULL,
    "status" "BetStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_fixtureId_fkey" FOREIGN KEY ("fixtureId") REFERENCES "Fixture"("id") ON DELETE CASCADE ON UPDATE CASCADE;
