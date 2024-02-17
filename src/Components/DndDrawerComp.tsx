import Button, { ButtonProps } from '@mui/material/Button';
import { useState } from "react";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { MetaData } from "../utils";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CopyToClipboardButtonComp from "./CopyToClipboardButtonComp";
import * as React from "react";
import { Grid } from "@mui/material";
import DragComp from "./DragComp";
import DropComp from "./DropComp";
import { generateGridURL } from "../utils";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';



const ButtonStyle = styled(Button)({
  whiteSpace: 'normal',
    appearance: 'none', 
    backgroundColor: 'transparent', 
    border: '2px solid #1A1A1A', 
  borderRadius: 15,
  boxSizing: 'border-box',
  color: '#3B3B3B',
  cursor: 'pointer',
  display: 'inline-block',
  fontWeight: 600,
  lineHeight: 'normal',
  margin: 0,
  minHeight: '50px',
  minWidth: 0,
  outline: 'none',
padding:' 8px 12px',
textAlign: 'center', 
textDecoration: 'none', 
transition:' all 300ms cubic-bezier(.23, 1, 0.32, 1)', 
userSelect: 'none', 
webkitUserSelect: 'none', 
touchAction: 'manipulation', 
width: '50%', 
willChange: 'transform', 
  fontFamily: [
   '"Segoe UI"'


  ].join(','),
  '&:hover': {
    color: '#fff',
    backgroundColor: '#1A1A1A',
    transform: 'translateY(-2px)',
  },
  '&:active': {
    boxShadow: 'none',
    transform:' translateY(0)',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});


interface DndDrawerCompProps {
  metaDataList: MetaData[];
  setMetaDataList: React.Dispatch<React.SetStateAction<MetaData[]>>;
  setDrawerState: React.Dispatch<React.SetStateAction<boolean>>;
}

const DndDrawerComp: React.VFC<DndDrawerCompProps> = ({
  metaDataList,
  setMetaDataList,
  setDrawerState,
}) => {
  const [url, setURL] = useState<string>("Click Generate URL");
  const [rows, setRows] = useState<number>(1);
  const [cols, setCols] = useState<number>(1);

  const addCol = () => {
    if (cols < 3) setCols(cols + 1);
  };
  const minusCol = () => {
    if (cols > 1) setCols(cols - 1);
  };
  const addRow = () => {
    if (rows < 3) setRows(rows + 1);
  };
  const minusRow = () => {
    if (rows > 1) setRows(rows - 1);
  };

  return (
    <div>
      <IconButton size="small" onClick={() => setDrawerState(false)}>
        <CloseIcon />
      </IconButton>
      <Box sx={{ width: 350, margin: "10px" }} role="presentation">
        <div>
          <Typography sx= {{fontFamily: "Segoe UI" }}>
            Cols
            <IconButton size="small" onClick={addCol}>
              <AddIcon />
            </IconButton>
            <IconButton
              sx={{ marginRight: "20px" }}
              size="small"
              onClick={minusCol}
            >
              <RemoveIcon />
            </IconButton>
            Rows
            <IconButton size="small" onClick={addRow}>
              <AddIcon />
            </IconButton>
            <IconButton size="small" onClick={minusRow}>
              <RemoveIcon />
            </IconButton>
          </Typography>
        </div>
        <Grid
          container
          spacing={1}
          alignItems="center"
          sx={{ marginTop: "5px" }}
        >
          {metaDataList.map((data) => {
            if (data.cord[0] == -1 && data.cord[1] == -1) {
              return (
                <Grid item alignItems="center">
                  <DragComp
                    metadata={data}
                    metaDataList={metaDataList}
                    setMetaDataList={setMetaDataList}
                  />
                </Grid>
              );
            }
          })}
        </Grid>
        <Divider />

        <Grid container alignItems="center" columns={12} sx={{ marginTop: "5px" }}>
          {Array.from(Array(cols * rows).keys()).map((value) => (
            <DropComp
              metaDataList={metaDataList}
              rows={rows}
              cols={cols}
              value={value}
              setMetaDataList={setMetaDataList}
            />
          ))}
        </Grid>
  
        <ButtonStyle 
          variant="contained"
          onClick={() => setURL(generateGridURL(metaDataList, rows, cols))}
        >
          Generate URL
        </ButtonStyle>
      
        <CopyToClipboardButtonComp url={url} />
        <div>
          <TextField
            size="medium"
            placeholder={url}
            multiline
            rows={8}
            maxRows={32}
            fullWidth
            sx={{ marginTop: "5px" }}
          />
        </div>
        
      </Box>
    </div>
  );
};

export default DndDrawerComp;
