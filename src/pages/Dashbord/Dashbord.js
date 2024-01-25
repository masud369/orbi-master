import React, { useState } from 'react';

const Dashbord = () => {
  const [image, setImage] = useState('');

  // Function to handle form submission
  const submitImage = (event) => {
    event.preventDefault();
    const data = new FormData(); // Typo here (fromData should be FormData)
    data.append("file", image);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "du1nuzfg8");
    fetch("https://api.cloudinary.com/v1_1/du1nuzfg8/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={submitImage}>upload</button>
    </div>
  );
}

export default Dashbord;
