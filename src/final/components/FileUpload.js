import React from 'react'
import { MuiFileInput } from 'mui-file-input'

const FileUpload = () => {
  const [file, setFile] = React.useState(null)

  const handleChange = (newFile) => {
    setFile(newFile)
  }

  return (
    <MuiFileInput value={file} onChange={handleChange} />
  )
}
