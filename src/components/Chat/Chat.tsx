import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../../config/firebase";
import {
  DocumentData,
  QuerySnapshot,
  addDoc,
  collection,
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
  padding-left: 330px;
  overflow: auto;
  overflow-x: hidden;
  .message {
    margin: 5px;
    padding: 18px;
    width: 100%;
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

const MessageContainer = styled.div``;

const Chat: React.FC = () => {
  const [user, setUser] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const [currentUserUid, setCurrentUserUid] = useState<string | null>(null);

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
      if (user) {
        setCurrentUserUid(user.uid);
      }
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

  return (
    <Layout>
      <Chatstyle ref={messageContainerRef}>
        <MessageContainer>
          {messages
            .slice()
            .reverse()
            .map((message) => (
              <div
                key={message.id}
                className={`message ${
                  message.sender === user?.email ? "sent" : "received"
                }`}
              >
                <strong>{message.sender}</strong>: {message.content}
                <div>{formatTimestamp(message.timestamp)}</div>
              </div>
            ))}
        </MessageContainer>
        <div>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </Chatstyle>
    </Layout>
  );
};
export default Chat;
