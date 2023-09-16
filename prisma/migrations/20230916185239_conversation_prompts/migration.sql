/*
  Warnings:

  - You are about to drop the column `transcription` on the `conversations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "conversations" DROP COLUMN "transcription";
ALTER TABLE "conversations" ADD COLUMN     "generated_prompts" STRING;
ALTER TABLE "conversations" ADD COLUMN     "summary" STRING;
