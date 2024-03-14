-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);
