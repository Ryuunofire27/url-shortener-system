-- CreateTable
CREATE TABLE "SHORTENED_URL_KEY" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "SHORTENED_URL_KEY_pkey" PRIMARY KEY ("id")
);
