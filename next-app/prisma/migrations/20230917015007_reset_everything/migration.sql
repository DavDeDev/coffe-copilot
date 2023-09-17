-- CreateTable
CREATE TABLE "conversations" (
    "conversation_id" STRING NOT NULL,
    "timestamp" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "text" STRING,
    "summary" STRING,
    "generated_prompts" STRING,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("conversation_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" STRING NOT NULL,
    "name" STRING(100),
    "image_url" STRING(255),
    "short_bio" STRING,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);
