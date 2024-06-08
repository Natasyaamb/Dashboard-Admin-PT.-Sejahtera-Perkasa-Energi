export const userColumns = [
    {
      field: "user",
      headerName: "Nama Supir",
      headerAlign: 'center',
      width: 300,
      renderCell: (params) => {
        return (
        <div className="cellWithImg">
          {/* Memeriksa apakah img ada */}
          {params.row.img ? (
            <img className="cellImg" src={params.row.img} alt="avatar" />
          ) : (
            // Jika img tidak ada, gunakan gambar default
            <img className="cellImg" src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" alt="default avatar" />
          )}
          <span className="cellText">{params.row.username}</span>
        </div>
        );
      },
    },
     
  ];
  let counter = 1;

// Menetapkan nomor terurut pada setiap baris
