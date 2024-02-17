import { useState, useMemo } from "react";
import { MetaDataListContext } from "../Context/DataContext";
import TextField from "@mui/material/TextField";
import SliderComp from "./SliderComp";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MetaData, initalValues } from "../utils";
import Divider from "@mui/material/Divider";
import { useContext } from "react";
import Viewport from "./Viewport";
import { Grid } from "@mui/material";

interface DrawerCompProps {
  metadataId: number;
  setDrawerState: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawerComp: React.VFC<DrawerCompProps> = ({
  metadataId,
  setDrawerState,
}) => {
  const [metadata, setMetadata] = useState<MetaData>(initalValues);
  const [stateFlag, setStateFlag] = useState(false);
  const { metaDataList, setMetaDataList } = useContext(MetaDataListContext);

  useMemo(() => {
    // @ts-ignore
    setMetadata(metaDataList.find((x) => x.id === metadataId));
  }, [metaDataList]);

  const saveStates = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStateFlag(true);

    setMetaDataList(
      [...metaDataList].map((object) => {
        if (object.id === metadataId) {
          if (key === "ci") {
            if (Number(event.target.value) > object.end_slice) {
              return {
                ...object,
                [key]: object.end_slice,
              };
            }
            if (Number(event.target.value) < object.start_slice) {
              return {
                ...object,
                [key]: 0,
              };
            }
          }
          return {
            ...object,
            [key]: event.target.value,
          };
        } else return object;
      })
    );
  };

  return (
    <Box sx={{ width: "375px" }} role="presentation">
      <IconButton
        aria-label="delete"
        size="small"
        onClick={() => setDrawerState(false)}
      >
        <CloseIcon />
      </IconButton>
      <Typography sx={{marginLeft: "10px"}}>{metadata.label}</Typography>
      <div style={{ height: "400px", width: "375px" }}>
        <Viewport
          metadataId={metadata.id}
          stateFlag={stateFlag}
          setStateFlag={setStateFlag}
        />
      </div>

      <Divider />

      <div style={{ marginLeft: "20px", marginBottom: "10px", marginTop: "10px"}}>
        <Typography>Slice Range</Typography>
        <div>
          <SliderComp
            metadata={metadata}
            stateFlag={stateFlag}
            setStateFlag={setStateFlag}
          />
        </div>
      </div>

      <Box sx={{ margin: "10px" }} role="presentation">
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography>Window Width</Typography>
            <TextField
              hiddenLabel
              value={metadata.ww}
              size="small"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                saveStates("ww", e)
              }
            />
          </Grid>

          <Grid item xs={4}>
            <Typography>Window Center</Typography>
            <TextField
              hiddenLabel
              value={metadata.wc}
              size="small"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                saveStates("wc", e)
              }
            />
          </Grid>
          <Grid item xs={4}>
            {/**fix Ci input */}
            <Typography>Current Slice</Typography>
            <TextField
              hiddenLabel
              value={metadata.ci}
              size="small"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                saveStates("ci", e)
              }
            />
          </Grid>
          <Grid item xs={3}>
            <Typography>Zoom</Typography>
            <TextField
              hiddenLabel
              value={metadata.z}
              size="small"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                saveStates("z", e)
              }
            />
          </Grid>

          <Grid item xs={3}>
            <Typography>Pan X</Typography>
            <TextField
              hiddenLabel
              value={metadata.px}
              size="small"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                saveStates("px", e)
              }
            />
          </Grid>
          <Grid item xs={3}>
            <Typography>Pan Y</Typography>
            <TextField
              hiddenLabel
              value={metadata.py}
              size="small"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                saveStates("py", e)
              }
            />
          </Grid>
          <Grid item xs={3}>
            <Typography>r</Typography>
            <TextField
              hiddenLabel
              value={metadata.r}
              size="small"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                saveStates("r", e)
              }
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DrawerComp;
