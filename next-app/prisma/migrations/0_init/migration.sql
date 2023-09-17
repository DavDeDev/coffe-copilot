-- CreateTable
CREATE TABLE "conversations" (
    "conversation_id" INT8 NOT NULL DEFAULT unique_rowid(),
    "timestamp" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "participants" INT8[],
    "transcription" STRING,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("conversation_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" INT8 NOT NULL DEFAULT unique_rowid(),
    "name" STRING(100),
    "image_url" STRING(255),
    "short_bio" STRING,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

