import React, { useState } from 'react';
import "./Pelunasan.css";
import { storage, db } from "../../config/firebase/index";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

const Pelunasan = ({ selectedDocId }) => {
  const [jarak, setJarak] = useState('');
  const [gajiPerKilometer, setGajiPerKilometer] = useState('');
  const [totalGaji, setTotalGaji] = useState(0);
  const [dp, setDP] = useState(0);
  const [pelunasan, setPelunasan] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imageName, setImageName] = useState('');

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
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Simpan nama file ke state
    setImageName(file.name);

    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setImageUrl(url);
    setSelectedImage(file);
  };

  const handleSaveImageToFirestore = async (id) => {
    if (!selectedDocId) {
      console.error('No document selected');
      return;
    }
  
    const docRef = doc(db, 'mastersupir', selectedDocId);
    await updateDoc(docRef, {
      linkbuktijarak: imageUrl,
    });
    alert('Image URL successfully saved to Firestore!');
  };

  return (
    <div className='gajisupir'>
      <h2>Pelunasan</h2>
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
            <p><b>Input Bukti Pelunasan</b></p>
            <label htmlFor="upload"></label>
            {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />}
            <input type="file" id="upload" accept="image/*" onChange={handleImageUpload} />
            {imageName && <span>{imageName}</span>}

  <div className="button-container">
    <button onClick={handleSaveImageToFirestore}>Kirim Bukti</button>
  </div>
</div>

      </div>
    </div>
  );
};

export default Pelunasan;
