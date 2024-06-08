import "./Datatablesj.css";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Space, Tag, Table, Button, Modal, Breadcrumb, Form, Input, Select, DatePicker } from 'antd';
import { userColumns, userRows } from "../../datatablesourcesuratjalan";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import { db } from "../../config/firebase/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

const layout = null;
const tailLayout = {
  wrapperCol: { span: 24 },
};

const Datatable = () => {
  const [isModalOpenbast, setIsModalOpenbast] = useState(false);
  const [isModalOpensj, setIsModalOpensj] = useState(false);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
     const fetchData = async () => {
       let list = [];
       try {
         const querySnapshot = await getDocs(collection(db, "mastersupir"));
         querySnapshot.forEach((doc) => {
           list.push({id : doc.id, ...doc.data()});
         });
         const filteredData = list.filter((item) => item.beritaacara !== "null" || item.suratjalan !== "null");
         setData(filteredData);
         console.log(filteredData);
       } catch (err) {
         console.log(err);
       }
     };
     fetchData();
  }, []);

  const getUserById = async (userId) => {
    try {
      const userDoc = await doc(db, 'mastersupir', userId);
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        return { id: userSnapshot.id, ...userSnapshot.data() };
      } else {
        console.log('No such user document!');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user document:', error);
      return null;
    }
  };

  const handleLaporan = () => {
    navigate('/laporan-sjbast');
  };

  const onFinishbast = async (values) => {
    try {
      // Menyimpan data ke Firestore
      const dataWithTimestamp = { ...values, timestamp: serverTimestamp() };
      const docRef = await addDoc(collection(db, 'bast'), dataWithTimestamp);
      console.log("Document written with ID: ", docRef.id);
      alert("Data Berhasil Disimpan!");
      setIsModalOpensj(false); 
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Oppps...Data Gagal Disimpan! Error" + error.message);
    }
    form.resetFields();;
  };

  const onFinishsj = async (values) => {
    try {
      // Menyimpan data ke Firestore
      const dataWithTimestamp = { ...values, timestamp: serverTimestamp() };
      const docRef = await addDoc(collection(db, 'suratjalan'), dataWithTimestamp);
      console.log("Document written with ID: ", docRef.id);
      alert("Data Berhasil Disimpan!");
      form.resetFields();
      setIsModalOpensj(false); 
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Oppps...Data Gagal Disimpan! Error" + error.message);
    }
  };

const showModalbast = async (params) => {
  if (params && params.row && params.row.id) {
    const userData = await getUserById(params.row.id);
    if (userData) {
      setSelectedUserData(userData);
      if (userData.beritaacara && userData.beritaacara !== "null") {
        setPdfUrl(userData.beritaacara);
        setIsModalOpenbast(true);
      } else {
        setModalMessage('BAST belum dibuat');
        setIsModalOpenbast(true);
      }
    } else {
      console.log('Error fetching user data.');
    }
  } else {
    console.log('Invalid params or row data.');
  }
};

  const showModalsj = async (params) => {
    if (params && params.row && params.row.id) {
      const userData = await getUserById(params.row.id);
      if (userData) {
        setSelectedUserData(userData);
        if (userData.suratjalan && userData.suratjalan !== "null") {
          setPdfUrl(userData.suratjalan);
          setIsModalOpensj(true);
        } else {
          setModalMessage('Surat Jalan belum dibuat');
          setIsModalOpensj(true);
        }
      } else {
        console.log('Error fetching user data.');
      }
    } else {
      console.log('Invalid params or row data.');
    }
  };
  
  const handleOk = () => {
    setIsModalOpensj(false);
    setIsModalOpenbast(false);
    setPdfUrl(null);
    setModalMessage('');
  };
  const handleCancel = () => {
    setIsModalOpensj(false);
    setIsModalOpenbast(false);
    setPdfUrl(null);
    setModalMessage('');
    window.location.reload(); 
  };
  const deletePdfLinkbast = async (docId) => {
    try {
      // Akses dokumen mastersupir yang sesuai dengan ID
      const userDoc = doc(db, 'mastersupir', docId);
      
      // Hapus link PDF dari field beritaacara dengan mengatur nilainya menjadi null
      await updateDoc(userDoc, {
        beritaacara: "null"
      });
  
      // Berhasil menghapus, tampilkan pesan atau lakukan tindakan lain jika diperlukan
      console.log('Link PDF BAST berhasil dihapus dari dokumen dengan ID:', docId);
    } catch (error) {
      console.error('Error deleting PDF link:', error);
      // Tampilkan pesan error atau lakukan tindakan lain jika diperlukan
    }
  };

  const deletePdfLinksj = async (docId) => {
    try {
      // Akses dokumen mastersupir yang sesuai dengan ID
      const userDoc = doc(db, 'mastersupir', docId);
      
      // Hapus link PDF dari field beritaacara dengan mengatur nilainya menjadi null
      await updateDoc(userDoc, {
        suratjalan: "null"
      });
  
      // Berhasil menghapus, tampilkan pesan atau lakukan tindakan lain jika diperlukan
      console.log('Link PDF SJ berhasil dihapus dari dokumen dengan ID:', docId);
    } catch (error) {
      console.error('Error deleting PDF link:', error);
      // Tampilkan pesan error atau lakukan tindakan lain jika diperlukan
    }
  };

  const handleDeletePdfbast = async () => {
    if (selectedUserData && selectedUserData.id) {
      try {
        // Panggil fungsi untuk menghapus link PDF BAST
        await deletePdfLinkbast(selectedUserData.id);
  
        // Setelah menghapus, tutup modal dan lakukan tindakan lain jika diperlukan
        setIsModalOpenbast(false);
        setPdfUrl(null);
        setModalMessage('');
      } catch (error) {
        console.error('Error deleting PDF link:', error);
        // Tampilkan pesan error atau lakukan tindakan lain jika diperlukan
      }
    } else {
      console.log('Invalid user data.');
    }
  };
  
  const handleDeletePdfsj = async () => {
    if (selectedUserData && selectedUserData.id) {
      try {
        // Panggil fungsi untuk menghapus link PDF BAST
        await deletePdfLinksj(selectedUserData.id);
  
        // Setelah menghapus, tutup modal dan lakukan tindakan lain jika diperlukan
        setIsModalOpenbast(false);
        setPdfUrl(null);
        setModalMessage('');
      } catch (error) {
        console.error('Error deleting PDF link:', error);
        // Tampilkan pesan error atau lakukan tindakan lain jika diperlukan
      }
    } else {
      console.log('Invalid user data.');
    }
  };

  const handleDownloadbast = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'BAST.pdf';
      link.click();
    }
  };

  const handleDownloadsj = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'Surat Jalan.pdf';
      link.click();
    }
  };

  console.log(data);

  const actionColumn = [
    {
      field: "action1",
      headerName: "Surat Jalan",
      headerAlign: 'center',
      width: 290,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => showModalsj(params)}
            >
              Lihat Surat Jalan
            </div>
          </div>
        );
      },
    },
    {
      field: "action2",
      headerName: "Berita Acara Serah Terima",
      headerAlign: 'center',
      width: 290,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => showModalbast(params)}
            >
              Lihat BAST
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Surat Jalan dan BAST
      </div>
      <Button style={{ backgroundColor: '#39706B', borderColor: 'green', color: 'white' }} onClick={handleLaporan}><FontAwesomeIcon icon={faList} /> &nbsp;Laporan</Button>
      <DataGrid
        className="datagrid"
        rows={data}
        rowHeight={50}
        columns={[
        ...userColumns,
          {
            field: "status",
            headerName: "Status",
            headerAlign: 'center',
            width: 300,
            renderCell: (params) => {
              return (
                <div className="statusContainer">
                  <div className={`cellWithStatus ${params.row.status ? 'available' : 'unavailable'}`}>
                    {params.row.status ? "Sedang di Proses" : "Sedang Bekerja"}
                   </div>
                </div>
              );
            },
          },
          ...actionColumn,
        ]}
        pageSize={9}
        rowsPerPageOptions={[9]}
        style={{ height: 600, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
        
      />
        <Modal title="Berita Acara dan Serah Terima" open={isModalOpenbast} onOk={handleOk} onCancel={handleCancel} footer={null} width={600}>
          {pdfUrl ? (
          <iframe
            src={pdfUrl}
            title="PDF Viewer"
            width="100%"
            height="500px"
          />
          ) : (
          <p>{modalMessage}</p>
          )} 
          <Space>
            <Button type="primary" onClick={handleDownloadbast} style={{ display: pdfUrl ? 'block' : 'none' }}>
              Unduh
            </Button>
            <Button type="primary" danger style={{ display: pdfUrl ? 'block' : 'none' }} onClick={handleDeletePdfbast}>
              Hapus
            </Button>      
          </Space>    
        </Modal>

        <Modal title="Surat Jalan" open={isModalOpensj} onOk={handleOk} onCancel={handleCancel} footer={null} width={600}>
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            title="PDF Viewer"
            width="100%"
            height="500px"
          />
          ) : (
          <p>{modalMessage}</p>
          )} 
          <Space>
            <Button type="primary" onClick={handleDownloadsj} style={{ display: pdfUrl ? 'block' : 'none' }}>
              Unduh
            </Button>
            <Button type="primary" danger style={{ display: pdfUrl ? 'block' : 'none' }} onClick={handleDeletePdfsj}>
              Hapus
            </Button>      
          </Space>           
        </Modal>
    </div>
  );
};

export default Datatable;