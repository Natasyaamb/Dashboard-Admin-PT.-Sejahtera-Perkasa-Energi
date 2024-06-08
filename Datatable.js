import "./Datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesourceusermanajemen";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../config/firebase/index";
import { auth } from "../../config/firebase/index";

const Datatable = () => {
  const [data, setData] = useState([]);
  const [selectedDocId, setSelectedDocId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "mastersupir"));
        querySnapshot.forEach((doc) => {
          list.push({id : doc.id, ...doc.data()});
        });
        setData(list);
        console.log(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
 }, []);

 console.log(data);

 const handleDelete = async (id) => {
  try {
    await deleteDoc(doc(db, "mastersupir", id));
    setData(data.filter((item) => item.id !== id));
  } catch (err) {
    console.log(err);
  }
  };

  const handleViewClick = (docId) => {
    setSelectedDocId(docId);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Profil Supir",
      headerAlign: 'center',
      width: 450,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/lihat-supir/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton1" onClick={() => handleViewClick(params.row.id)}>Lihat</div>
            </Link>
            <Link to={`/edit-supir/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton2" onClick={() => handleViewClick(params.row.id)}>Edit</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Hapus
            </div>
          </div>
        );
      },
    },
    
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        User Manajemen
        <Link to="/add-supir" className="link">
          Buat Akun
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        rowHeight={50}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        style={{ height: 650, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
      />
    </div>
  );
};

export default Datatable;