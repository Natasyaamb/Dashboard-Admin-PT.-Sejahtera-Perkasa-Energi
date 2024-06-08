import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./DownPayment.css";
import { storage, db } from "../../config/firebase/index";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const HitungGaji = () => {
  const { selectedDocId } = useParams();
  const [jarak, setJarak] = useState('');
  const [gajiPerKilometer, setGajiPerKilometer] = useState('');
  const [totalGaji, setTotalGaji] = useState(0);
  const [dp, setDP] = useState(0);
  const [pelunasan, setPelunasan] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imageName, setImageName] = useState('');
  const [selectedImageDP, setSelectedImageDP] = useState(null);
  const [imageUrlDP, setImageUrlDP] = useState('');
  const [imageNameDP, setImageNameDP] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (selectedDocId) {
      fetchUserData();
    } else {
      console.error('No document selected');
    }
  }, [selectedDocId]);

  const fetchUserData = async () => {
    const docRef = doc(db, 'mastersupir', selectedDocId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUsername(docSnap.data().username); // Asumsikan dokumen memiliki field 'username'
    } else {
      console.error('No such document!');
    }
  };

  const handleJarakChange = (event) => {
    setJarak(event.target.value);
  };

  const handleGajiPerKilometerChange = (event) => {
    setGajiPerKilometer(event.target.value);
  };

  const calculate = () => {
    const jarakNumeric = parseFloat(jarak.replace(/\./g, ''));
    const gajiPerKilometerNumeric = parseFloat(gajiPerKilometer.replace(/\./g, ''));

    const total = jarakNumeric * gajiPerKilometerNumeric;

    const dpValue = 0.3 * total;
    const pelunasanValue = 0.7 * total;

    setTotalGaji(total.toLocaleString('id-ID'));
    setDP(dpValue.toLocaleString('id-ID'));
    setPelunasan(pelunasanValue.toLocaleString('id-ID'));
  }

  
  const getWIBTimestamp = () => {
    const now = new Date();
    const wibOffset = 7 * 60; // Offset dalam menit untuk WIB (GMT+7)
    const utcOffset = now.getTimezoneOffset(); // Offset UTC dalam menit
    const totalOffset = wibOffset + utcOffset; // Total offset dalam menit

    const wibTime = new Date(now.getTime() + totalOffset * 60000);
    const year = wibTime.getFullYear();
    const month = String(wibTime.getMonth() + 1).padStart(2, '0');
    const date = String(wibTime.getDate()).padStart(2, '0');
    const hours = String(wibTime.getHours()).padStart(2, '0');
    const minutes = String(wibTime.getMinutes()).padStart(2, '0');
    const seconds = String(wibTime.getSeconds()).padStart(2, '0');
    return `${year}${month}${date}-${hours}${minutes}${seconds}`;
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !username) return;

    const timestamp = getWIBTimestamp();
    const newFileName = `buktijarak-${username}-${timestamp}`;
    const storageRef = ref(storage, `images/${newFileName}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setImageUrl(url);
    setImageName(newFileName);
    setSelectedImage(file);
  };

  const handleImageUploadDP = async (event) => {
    const file = event.target.files[0];
    if (!file || !username) return;

    const timestamp = getWIBTimestamp();
    const newFileName = `buktidp-${username}-${timestamp}`;
    const storageRefDP = ref(storage, `images/${newFileName}`);
    await uploadBytes(storageRefDP, file);
    const urlDP = await getDownloadURL(storageRefDP);
    setImageUrlDP(urlDP);
    setImageNameDP(newFileName);
    setSelectedImageDP(file);
  };

  const handleSaveImageToFirestore = async () => {
    if (!selectedDocId) {
      console.error('No document selected');
      return;
    }
  
    const docRef = doc(db, 'mastersupir', selectedDocId);
    await updateDoc(docRef, {
      linkbuktijarak: imageUrl,
      linkbuktidp: imageUrlDP,
    });
    alert('Berhasil terkirim');
  };

  return (
    <div className='gajisupir'>
      <h2>Down Payment/DP</h2>
      <div className='base'>
        <div className='content1'>
          <form>
            <div>
              <label htmlFor="jarak">Jarak (kilometer) : </label>
              <input
                type="number"
                id="jarak"
                name="jarak"
                value={jarak}
                onChange={handleJarakChange}
              />
            </div>
            <div>
              <label htmlFor="gajiPerKilometer">Gaji per Kilometer : </label>
              <input
                type="number"
                id="gajiPerKilometer"
                name="gajiPerKilometer"
                value={gajiPerKilometer}
                onChange={handleGajiPerKilometerChange}
              />
            </div>
            <button type="button" onClick={calculate}>
              Hitung
            </button>
          </form>
          <div className='hasil'>
            <p>Total Gaji: {totalGaji}</p>
            <p>DP        : {dp}</p>
            <p>Pelunasan : {pelunasan}</p>
          </div>
        </div>
        <div className='content2'></div>
        <div className='content3'>
            <p><b>Input Bukti Jarak Tempuh Supir</b></p>
            <label htmlFor="upload"></label>
            {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />}
            <input type="file" id="upload" accept="image/*" onChange={handleImageUpload} />
            {imageName && <span>{imageName}</span>}
            
            <p><b>Input Bukti DP</b></p>
            <label htmlFor="uploadDP"></label>
           {imageUrlDP && <img src={imageUrlDP} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />}
           <input type="file" id="uploadDP" accept="image/*" onChange={handleImageUploadDP} />
           {imageNameDP && <span>{imageNameDP}</span>}

            <div className="button-container">
              <button onClick={handleSaveImageToFirestore}>Kirim Bukti</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HitungGaji;
