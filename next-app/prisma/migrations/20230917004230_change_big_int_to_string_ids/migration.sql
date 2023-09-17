/*
  Warnings:

  - You are about to alter the column `conversation_id` on the `conversations` table. The data in that column will be cast from `BigInt` to `String`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `user_id` on the `users` table. The data in that column will be cast from `BigInt` to `String`. This cast may fail. Please make sure the data in the column can be cast.

*/
-- RedefineTables
CREATE TABLE "_prisma_new_conversations" (
    "conversation_id" STRING NOT NULL,
    "timestamp" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "text" STRING,
    "summary" STRING,
    "generated_prompts" STRING,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("conversation_id")
);
INSERT INTO "_prisma_new_conversations" ("conversation_id","generated_prompts","summary","text","timestamp") SELECT "conversation_id","generated_prompts","summary","text","timestamp" FROM "conversations";
DROP TABLE "conversations" CASCADE;
ALTER TABLE "_prisma_new_conversations" RENAME TO "conversations";
CREATE TABLE "_prisma_new_users" (
    "user_id" STRING NOT NULL,
    "name" STRING(100),
    "image_url" STRING(255),
    "short_bio" STRING,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);
INSERT INTO "_prisma_new_users" ("image_url","name","short_bio","user_id") SELECT "image_url","name","short_bio","user_id" FROM "users";
DROP TABLE "users" CASCADE;
ALTER TABLE "_prisma_new_users" RENAME TO "users";
