import { useEffect, useState } from "react";

import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db, auth, storage } from "../../config/firebase";
import { Auth } from "../Authorization/Auth";
import { ref, uploadBytes } from "firebase/storage";

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

  //File Upload State
  const [fileUpload, setFileUpload] = useState<File | undefined>();
  const [inputKey, setInputKey] = useState<number>(0);
  const [showPopup, setShowPopup] = useState(false);

  const handleCheckboxChange = (value: boolean) => {
    setIsWorkInTheSystem(value);
  };

  const onSubmitUser = async () => {
    try {
      await addDoc(usersCollectionRef, {
        mechanic: newUser,
        shift: currentShift,
        workInTheSystem: isWorkInTheSystem,
        userId: auth?.currentUser?.uid,
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
    await updateDoc(userDoc, { mechanic: updateNameUser }); // aby działalo trzeba uzyć to w innym stanie w innych komponentach
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `fileUsers/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
      setShowPopup(true); // Wyświetlanie popupu po pomyślnym przesłaniu pliku
      setTimeout(() => {
        setShowPopup(false); // Ukrywanie popupu po pewnym czasie
      }, 3000); // Czas trwania popupu (3 sekundy w tym przypadku)
    } catch (err) {
      console.log(err);
    } finally {
      setFileUpload(undefined);
      setInputKey((prevKey) => prevKey + 1); // Resetowanie wartości po zakończeniu przesyłania pliku
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFileUpload(file);
    }
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
        <div>
          {showPopup && <div className="popup">Pomyślnie dodano plik</div>}
          <input key={inputKey} type="file" onChange={handleFileChange} />
          <button onClick={uploadFile}>Upload File</button>
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
