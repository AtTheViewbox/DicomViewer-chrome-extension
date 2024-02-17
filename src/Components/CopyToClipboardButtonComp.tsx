import { Button, Snackbar } from '@mui/material'
import { useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


interface CopyToClipboardButtonCompProps {
  url: string;
}

const CopyToClipboardButtonComp: React.VFC<CopyToClipboardButtonCompProps>  = ({url}) => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
      setOpen(true)
      navigator.clipboard.writeText(url)
      
    }
    
    return (
        <>
          <Button onClick={handleClick}><ContentCopyIcon sx={{ color: 'black' }} /></Button>
          <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={2000}
            message="Copied to clipboard"
          />
        </>
    )
}

export default CopyToClipboardButtonComp