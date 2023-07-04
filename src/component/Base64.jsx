import React, { useState } from 'react'

const Base64 = () => {
  const [base, setBase] = useState()

  const handleChange = async (e) => {
    const file = e.target.files[0]
    console.log(file[0],"image upload file")

    const base64 = await convertBase64(file)
    setBase(base64)
    console.log(base64 ,"converted image upload file") 
  }

  // handleChange()


  const convertBase64=(file) => {
    return new Promise((res, rej) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        res(fileReader.result);
      }

      fileReader.onerror = (error) => {
        rej(error)
      }
    })
  }


  return (
    <div>
      Base64
      <div style={{display:"flex", alignItems:"center",justifyContent:"center"}}>
          <input type="file" name='basefile' id='basefile' onChange={handleChange}/>
      </div>
      <div>
        {base}
      </div>

    </div>
  )
}

export default Base64