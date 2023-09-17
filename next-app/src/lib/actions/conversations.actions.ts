"use server";
import { prisma } from "../cockroachDB";

// export const createConversation = async (
//   text: string,
//   summary: string,
//   generated_prompts: string
// ) => {
//   try {
//     const conversation = await prisma.conversations.create({
//       data: {
//         text: text,
//         summary: summary,
//         generated_prompts: generated_prompts,
//       },
//     });
//     console.log(conversation);
//     return conversation;
//   } catch (error) {
//     console.error("Error creating conversation:", error);
//   }
// };

export const createConversation = async (userObj: any) => {
  // const conversation = await prisma.conversations.create({
  //   data: {
  //     user: userObj,
  //   },
  // });
  const conversation = await prisma.conversations.create({
    data: {
      user: {
        connect: {
          user_id: userObj.user_id,
        },
      },
    },
  });

  return conversation.conversation_id;
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

export const findUserConversations = async (userId: string) => {
  const userConversations = await prisma.conversations.findMany({
    where: {
      user_id: userId,
    },
  });

  return userConversations;
};
