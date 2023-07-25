import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../../config/firebase";
import {
  DocumentData,
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import styled from "styled-components";
import Layout from "../layout/Layout";

const Chatstyle = styled.div`
  width: 100%;
  height: 100%;
  background: lightgrey;
  padding-left: 300px;
  overflow: auto;
  overflow-x: hidden;

  .message {
    margin: 5px 0;
    padding: 18px;
    width: 100%;
    word-break: break-word;
  }

  .sent {
    background-color: #f5fffa;
    text-align: right;
  }

  .received {
    background-color: #eee8aa;
    text-align: left;
  }
`;

const ContainerMessage = styled.div`
  width: 100%;
`;

const TextMessage = styled.div`
  width: 100%;
`;

const TimeMessage = styled.div`
  width: 100%;
`;

const ChatSentContainer = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ChatInput = styled.input`
  margin-left: 5px;
  padding: 18px;
  border-radius: 2px;
  border: none;
  width: 1225px;
  text-decoration: none;
  height: 50px;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  position: fixed;
  bottom: 0;
  color: #ffff;
  background: #282f39;

  &:focus {
    box-shadow: 0px 0px 24px #f08b62;
  }
`;

const ChatButton = styled.div`
  position: fixed;
  bottom: 10px;
  right: 210px;
  svg {
    cursor: pointer;
    align-items: center;
    display: flex;
  }
`;

const DeleteButton = styled.div`
  svg {
    cursor: pointer;
    width: 15px;
    height: 15px;
  }
`;

const TimeButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin-left: 10px;
    align-items: center;
    display: flex;
    justify-content: center;
  }
`;
const Chat: React.FC = () => {
  const [user, setUser] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // const [currentUserUid, setCurrentUserUid] = useState<string | null>(null);

  const messageContainerRef = useRef<HTMLDivElement>(null);

  // Funkcja do wysyłania wiadomości
  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    const currentUser = auth.currentUser;
    if (!currentUser) return;

    // const messageData = {
    //   sender: currentUser.uid,
    //   content: newMessage.trim(),
    //   timestamp: Date.now(),
    // };

    try {
      // Pobierz aktualnie zalogowanego użytkownika
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const messageData = {
        sender: currentUser.email, // Użyj adresu e-mail zamiast ID
        content: newMessage.trim(),
        timestamp: Date.now(),
      };

      // Dodaj nową wiadomość do lokalnego stanu przed zapisem na serwerze
      setMessages([...messages, messageData]);

      // Zapisz wiadomość na serwerze Firebase
      await addDoc(collection(db, "messages"), messageData);

      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop =
          messageContainerRef.current.scrollHeight;
      }
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Nasłuchiwanie na zmiany w kolekcji 'messages' w czasie rzeczywistym
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const newMessages: any[] = [];
        snapshot.docs.forEach((doc) => {
          newMessages.push({ id: doc.id, ...doc.data() });
        });
        // Aktualizuj widok po otrzymaniu nowych wiadomości z serwera
        setMessages(newMessages);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  // Sprawdzenie, czy użytkownik jest zalogowany
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      // if (user) {
      //   setCurrentUserUid(user.uid);
      // }
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return <div>Please log in to use the chat.</div>;
  }
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  const deleteMessage = async (messageId: string) => {
    try {
      await deleteDoc(doc(db, "messages", messageId));

      // Usuń wiadomość z lokalnego stanu
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== messageId)
      );
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <Layout>
      <Chatstyle ref={messageContainerRef}>
        <ContainerMessage>
          {messages
            .slice()
            .reverse()
            .map((message) => (
              <TextMessage
                key={message.id}
                className={`message ${
                  message.sender === user?.email ? "sent" : "received"
                }`}
              >
                <strong>{message.sender}</strong>: {message.content}
                <TimeButton>
                  <TimeMessage>
                    {formatTimestamp(message.timestamp)}
                  </TimeMessage>
                  {message.sender === user?.email && ( // Pokaż przycisk tylko jeśli wiadomość należy do zalogowanego użytkownika
                    <DeleteButton>
                      <svg
                        id="Layer_1"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        onClick={() => deleteMessage(message.id)}
                      >
                        <title>spam, trash, bin, garbage, delete</title>
                        <path d="M2.88,5,5.11,24H18.89L21.12,5ZM17.11,22H6.89L5.12,7H18.88Z" />
                        <polygon points="21 2 15 2 15 1 13 1 13 0 11 0 11 1 9 1 9 2 3 2 3 4 21 4 21 2" />
                      </svg>
                    </DeleteButton>
                  )}
                </TimeButton>
              </TextMessage>
            ))}
        </ContainerMessage>
        <ChatSentContainer>
          <ChatInput
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <ChatButton onClick={sendMessage}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M61.06 2.93974C60.8633 2.74408 60.6161 2.60685 60.346 2.54329C60.0759 2.47974 59.7934 2.49235 59.53 2.57974L3.53004 21.2397C3.25136 21.3373 3.00767 21.5149 2.82951 21.7504C2.65134 21.9858 2.54662 22.2686 2.52847 22.5633C2.51032 22.858 2.57954 23.1515 2.72747 23.407C2.87539 23.6625 3.09544 23.8687 3.36004 23.9997L28.21 35.7897L40 60.6397C40.1209 60.8959 40.3118 61.1127 40.5507 61.2649C40.7896 61.4171 41.0668 61.4985 41.35 61.4997H41.44C41.7371 61.4836 42.0227 61.38 42.2611 61.2021C42.4995 61.0242 42.68 60.7799 42.78 60.4997L61.44 4.49974C61.531 4.23043 61.5436 3.9408 61.4763 3.66461C61.4091 3.38842 61.2647 3.13703 61.06 2.93974V2.93974Z"
                fill="#97CCEF"
              />
              <path
                d="M60.79 2.71988C60.5015 2.54438 60.1624 2.47069 59.827 2.51057C59.4917 2.55045 59.1794 2.70161 58.94 2.93988L28.29 33.5799C28.0688 33.8029 27.9222 34.089 27.8703 34.3988C27.8184 34.7086 27.8637 35.0269 28 35.3099L40 60.6399C40.1216 60.8976 40.3141 61.1154 40.5549 61.2677C40.7958 61.42 41.0751 61.5005 41.36 61.4999H41.45C41.746 61.4844 42.0307 61.381 42.2676 61.2028C42.5045 61.0247 42.6829 60.78 42.78 60.4999L61.45 4.49988C61.5622 4.17259 61.5577 3.81658 61.4374 3.49219C61.3172 3.16779 61.0884 2.89495 60.79 2.71988V2.71988Z"
                fill="#0099D6"
              />
            </svg>
          </ChatButton>
        </ChatSentContainer>
      </Chatstyle>
    </Layout>
  );
};
export default Chat;
