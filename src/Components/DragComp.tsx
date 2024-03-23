import { MetaData } from "../utils";
import * as React from "react";
import { useDrag } from "react-dnd";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface DragCompProps {
  metadata: MetaData;
  metaDataList: MetaData[];
  setMetaDataList: React.Dispatch<React.SetStateAction<MetaData[]>>;
}

const DragComp: React.VFC<DragCompProps> = ({
  metadata,
  metaDataList,
  setMetaDataList,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: { id: metadata.id },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const resetPosition = () => {
    setMetaDataList(
      [...metaDataList].map((object) => {
        if (object.id === metadata.id) {
          return {
            ...object,
            cord: [-1, -1],
          };
        } else return object;
      })
    );
  };

  return (
  
    <Box
      sx={{
        width: 76,
        height: 60,
        border: "1px solid black",
        margin:"auto"
      }}
      ref={drag}     
    >
      <Typography style={{ fontSize: 13 }}>
        <IconButton size="small" onClick={() => resetPosition()}>
          <CloseIcon style={{ fontSize: 13 }} />
        </IconButton>
        {metadata.label}
      </Typography>
    </Box>

  );
};

export default DragComp;
