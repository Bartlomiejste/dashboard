import React, { useState, useEffect } from "react";
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
  background: pink;
  padding-left: 350px;
`;

const MessageContainer = styled.div``;

const Chat: React.FC = () => {
  const [user, setUser] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Funkcja do wysyłania wiadomości
  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const messageData = {
      sender: currentUser.uid,
      content: newMessage.trim(),
      timestamp: Date.now(),
    };

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

  // Sprawdzenie, czy użytkownik jest zalogowany
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
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
      <Chatstyle>
        <MessageContainer>
          {messages.map((message) => (
            <div key={message.id}>
              <strong>{message.sender}</strong>: {message.content}
              <span
                style={{ marginLeft: "8px", fontSize: "0.8rem", color: "gray" }}
              >
                {formatTimestamp(message.timestamp)}
              </span>
            </div>
          ))}
        </MessageContainer>
        <div>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </Chatstyle>
    </Layout>
  );
};
export default Chat;
