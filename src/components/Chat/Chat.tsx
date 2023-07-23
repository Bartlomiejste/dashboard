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
  background: pink;
  position: absolute;
  left: 500px;
`;

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

  return (
    <Layout>
      <Chatstyle>
        <div>
          {messages.map((message, id) => (
            <div key={id}>
              <strong>{message.sender}</strong>: {message.content}
            </div>
          ))}
        </div>
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
