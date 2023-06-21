import { useEffect, useState } from "react";

import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { Auth } from "../Authorization/Auth";

interface User {
  id: string;
  mechanic: string;
  shift: string;
  workInTheSystem: boolean;
}

const UsersTable = () => {
  const usersCollectionRef = collection(db, "user");

  const [users, setUsers] = useState<User[]>([]);
  //New users
  const [newUser, setNewUser] = useState<string>("");
  const [currentShift, setCurrentShift] = useState<string>("");
  const [isWorkInTheSystem, setIsWorkInTheSystem] = useState<boolean>(false);

  // Update user
  const [updateNameUser, setUpdateNameUser] = useState<string>("");

  const handleCheckboxChange = (value: boolean) => {
    setIsWorkInTheSystem(value);
  };

  const onSubmitUser = async () => {
    try {
      await addDoc(usersCollectionRef, {
        mechanic: newUser,
        shift: currentShift,
        workInTheSystem: isWorkInTheSystem,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDocs(usersCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          mechanic: doc.data().mechanic,
          shift: doc.data().shift,
          workInTheSystem: doc.data().workInTheSystem,
        }));
        setUsers(filteredData);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [onSubmitUser]);

  const deleteUser = async (id: string) => {
    const userDoc = doc(db, "user", id);
    await deleteDoc(userDoc);
  };

  const updateUser = async (id: string) => {
    const userDoc = doc(db, "user", id);
    await updateDoc(userDoc, { mechanic: updateNameUser });
  };

  return (
    <>
      <div>
        <Auth />
      </div>

      <div>
        <input
          placeholder="User Name..."
          onChange={(e) => setNewUser(e.target.value)}
        />
        <input
          placeholder="Shifts..."
          onChange={(e) => setCurrentShift(e.target.value)}
        />
        <div>
          <input
            type="checkbox"
            checked={isWorkInTheSystem}
            onChange={() => handleCheckboxChange(true)}
          />
          <label>Tak</label>
        </div>
        <div>
          <input
            type="checkbox"
            checked={!isWorkInTheSystem}
            onChange={() => handleCheckboxChange(false)}
          />
          <label>Nie</label>

          <button onClick={onSubmitUser}>Zapisz użytkownika</button>
        </div>
      </div>

      {users.map((user) => {
        return (
          <div key={user.id}>
            <div>{user.mechanic}</div>
            <input
              placeholder="Edit name"
              onChange={(e) => setUpdateNameUser(e.target.value)}
            />
            <button onClick={() => updateUser(user.id)}>Update name</button>

            <div style={{ color: user.workInTheSystem ? "green" : "red" }}>
              {user.shift}
            </div>
            <div>{user.workInTheSystem}</div>
            <button onClick={() => deleteUser(user.id)}>
              Usuń użytkownika
            </button>
          </div>
        );
      })}
    </>
  );
};

export default UsersTable;
