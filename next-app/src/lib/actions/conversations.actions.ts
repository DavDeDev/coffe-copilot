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

export const updateConversation = async (
  text: string,
  summary: string,
  generated_prompts: string,
  conversation_id: string
) => {
  try {
    const updatedConversation = await prisma.conversations.update({
      where: {
        conversation_id: conversation_id,
      },
      data: {
        text: text,
        summary: summary,
        generated_prompts: generated_prompts,
      },
    });
    console.log(updatedConversation);
    return updatedConversation;
  } catch (error) {
    console.error("Error updating conversation: ", error);
  }
};
