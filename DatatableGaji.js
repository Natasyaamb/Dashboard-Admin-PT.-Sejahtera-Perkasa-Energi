import "./Datatablegaji.css";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Space, Button, Modal } from 'antd';
import { collection, getDocs, getDoc, doc, updateDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase/index";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { userColumns } from "../../datatablesourcegaji";

const Datatable = () => {
  const [isModalOpenbast, setIsModalOpenbast] = useState(false);
  const [isModalOpensj, setIsModalOpensj] = useState(false);
  const [data, setData] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [modalMessage, setModalMessage] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [validatedUserIds, setValidatedUserIds] = useState([]);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "mastersupir"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });

        const filteredData = list.filter((item) => item.beritaacara && item.suratjalan);
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

  const handleBayarClickdp = (id) => {
    navigate(`/down-payment/${id}`);
  };

  const handleBayarClickpelunasan = (id) => {
    navigate(`/pelunasan/${id}`);
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
      const userDoc = doc(db, 'mastersupir', docId);
      await updateDoc(userDoc, { beritaacara: "null" });
      console.log('Link PDF BAST berhasil dihapus dari dokumen dengan ID:', docId);
    } catch (error) {
      console.error('Error deleting PDF link:', error);
    }
  };

  const deletePdfLinksj = async (docId) => {
    try {
      const userDoc = doc(db, 'mastersupir', docId);
      await updateDoc(userDoc, { suratjalan: "null" });
      console.log('Link PDF SJ berhasil dihapus dari dokumen dengan ID:', docId);
    } catch (error) {
      console.error('Error deleting PDF link:', error);
    }
  };

  const handleDeletePdfbast = async () => {
    if (selectedUserData && selectedUserData.id) {
      try {
        await deletePdfLinkbast(selectedUserData.id);
        setIsModalOpenbast(false);
        setPdfUrl(null);
        setModalMessage('');
      } catch (error) {
        console.error('Error deleting PDF link:', error);
      }
    } else {
      console.log('Invalid user data.');
    }
  };

  const handleDeletePdfsj = async () => {
    if (selectedUserData && selectedUserData.id) {
      try {
        await deletePdfLinksj(selectedUserData.id);
        setIsModalOpenbast(false);
        setPdfUrl(null);
        setModalMessage('');
      } catch (error) {
        console.error('Error deleting PDF link:', error);
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

  const handleValidation = async (docId) => {
    if (!validatedUserIds.includes(docId)) {
      setValidatedUserIds([...validatedUserIds, docId]);
    }
    setIsModalOpensj(false);
  };

  const showModalsj = async (params) => {
    if (params && params.row && params.row.id) {
      const userData = await getUserById(params.row.id);
      if (userData) {
        setSelectedUserData(userData);
        if (userData.linkbuktisurat && userData.linkbuktisurat !== "null") {
          setImageUrl(userData.linkbuktisurat);
          setIsModalOpensj(true);
        } else {
          setModalMessage('Supir masih dalam pengiriman !!!');
          setIsModalOpensj(true);
        }
      } else {
        console.log('Error fetching user data.');
      }
    } else {
      console.log('Invalid params or row data.');
    }
  };

  const actionColumn = [
    {
      field: "action1",
      headerName: "Down Payment/DP",
      headerAlign: 'center',
      width: 220,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton" 
            onClick={() => handleBayarClickdp(params.row.id)}>
              Bayar
            </div>
          </div>
        );
      },
    },
    {
      field: "action2",
      headerName: "Validasi",
      headerAlign: 'center',
      width: 220,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton" onClick={() => showModalsj(params)}>
              Cek 
            </div>
          </div>
        );
      },
    },
    {
      field: "action3",
      headerName: "Pelunasan",
      headerAlign: 'center',
      width: 220,
      renderCell: (params) => {
        const isValidated = validatedUserIds.includes(params.row.id);
        return (
          <div className="cellAction">
            <div 
              className={`viewButton ${!isValidated ? 'disabled' : ''}`} 
              onClick={!isValidated ? null : () => handleBayarClickpelunasan(params.row.id)}
            >
              Bayar
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Gaji Supir
      </div>
      <Button style={{ backgroundColor: '#39706B', borderColor: 'green', color: 'white' }} onClick="">
        <FontAwesomeIcon icon={faList} /> &nbsp;Laporan
      </Button>
      <DataGrid
        className="datagrid"
        rows={data}
        rowHeight={50}
        columns={[
          ...userColumns,
          {
            field: "status",
            headerName: "Status Pelunasan",
            headerAlign: 'center',
            width: 300,
            renderCell: (params) => {
              const { pelunasanvalid } = params.row;
              let statusText = "Belum mengirim";
              if (pelunasanvalid === "pending") {
                statusText = "Belum dibayar";
              } else if (pelunasanvalid === "lunas") {
                statusText = "Lunas";
              }
              return (
                <div className="statusContainer">
                  <div className={`cellWithStatus ${pelunasanvalid ? 'available' : 'unavailable'}`}>
                    {statusText}
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

      <Modal title="Validasi Penyelesaian Pengiriman" open={isModalOpensj} onOk={handleOk} onCancel={handleCancel} footer={null} width={600}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Bukti Surat"
            style={{ width: "100%", maxHeight: "500px", objectFit: "contain", paddingBottom: "10px" }}
          />
        ) : (
          <p>{modalMessage}</p>
        )}
        <div className="modalButtons">
          <Button type="primary" onClick={() => handleValidation(selectedUserData.id)} >
            Validasi
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Datatable;
