"use server";
import { prisma } from "../cockroachDB";

export const createConversation = async (
  text: string,
  summary: string,
  generated_prompts: string
) => {
  try {
    const conversation = await prisma.conversations.create({
      data: {
        text: text,
        summary: summary,
        generated_prompts: generated_prompts,
      },
    });
    console.log(conversation);
    return conversation;
  } catch (error) {
    console.error("Error creating conversation:", error);
  }
};
