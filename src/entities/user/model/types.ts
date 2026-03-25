export type User = {
  uuid: string;
  username: string;
  createdAt: string;
  loginCode: string;
}

export type UserStore = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

const users = [
  {
    uuid: "currentUserUuid",
    username: "currentUserUsername",
    createdAt: "10:00",
    chats: [
      {
        username: "otherUserUsername",
        messages: [
          {
            uuid: "msg1",
            author: "otherUserUsername",
            text: "Hello world by otherUserUsername",
            date: "10:15",
            replyTo: null
          },
          {
            uuid: "msg2",
            author: "currentUserUsername",
            text: "Yep! Agree!",
            date: "10:16",
            replyTo: "msg1"
          },
        ]
      },
      {
        username: "otherUserUsername2",
        messages: [
          {
            uuid: "msg1",
            author: "otherUserUsername2",
            text: "Hello world by otherUserUsername2",
            date: "10:15",
            replyTo: null
          },
          {
            uuid: "msg2",
            author: "currentUserUsername",
            text: "Yep! Agree!",
            date: "10:16",
            replyTo: "msg1"
          },
        ]
      }
    ]
  },
  {
    uuid: "otherUserUuid2",
    username: "otherUserUsername2",
    createdAt: "11:00",
    chats: [
      {
        username: "otherUserUsername3",
        messages: [
          {
            uuid: "msg1",
            author: "otherUserUsername3",
            text: "Hello world by otherUserUsername3",
            date: "10:15",
            replyTo: null
          },
          {
            uuid: "msg2",
            author: "otherUserUsername2",
            text: "Yep! Agree!",
            date: "10:16",
            replyTo: "msg1"
          },
        ]
      }
    ]
  }
]