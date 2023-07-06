import styled from "styled-components";
import pencilIcon from "../assets/pencil.png";
import disketteIcon from "../assets/diskette.png";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const EditIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const SaveIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const UserTable = () => {
  return (
    <Table>
      <thead>
        <tr>
          <TableHeader>Lp.</TableHeader>
          <TableHeader>Nazwa pracownika</TableHeader>
          <TableHeader>Zmiana</TableHeader>
          <TableHeader>System</TableHeader>
          <TableHeader>Najbliższy urlop</TableHeader>
          <TableHeader>Akcje</TableHeader>
        </tr>
      </thead>
      <tbody>
        <tr>
          <TableCell>1</TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell>Poranna</TableCell>
          <TableCell>Windows</TableCell>
          <TableCell>10-08-2023</TableCell>
          <TableCell>
            <EditIcon src={pencilIcon} alt="Edytuj" />
            <SaveIcon src={disketteIcon} alt="Zapisz" />
          </TableCell>
        </tr>
      </tbody>
    </Table>
  );
};

export default UserTable;
