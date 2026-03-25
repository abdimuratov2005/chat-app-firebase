



export const mockeChats = {
  chatID: {
      type: "direct",
      members: ["userUUID_1", "userUUID_2"],
      lastMessage: {
        text: "Just chating",
        senderId: "userUUID_1",
      },
      updatedAt: "10:00",
      messages: {
        message_001: {
          senderUUID: "userUUID_1",
          createdAt: "9:55",
          text: "Hello!",
          editedAt: null,
          status: "read",
          replyTo: null,
        },
        message_002: {
          senderUUID: "userUUID_2",
          createdAt: "9:57",
          text: "Hii!",
          editedAt: null,
          status: "read",
          replyTo: {
            messageId: "message_001",
            text: "Hello!",
            senderId: "userUUID_1",
          },
          message_003: {
            senderUUID: "userUUID_2",
            createdAt: "9:58",
            text: "What's up?",
            editedAt: null,
            status: "read",
            replyTo: null,
          },
          message_004: {
            senderUUID: "userUUID_1",
            createdAt: "10:00",
            text: "Just chating",
            editedAt: null,
            status: "sent",
            replyTo: {
              messageId: "message_003",
              text: "What's up?",
              senderId: "userUUID_2",
            },
          },
        },
      },
    },
};
