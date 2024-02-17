import { useState } from "react";
import Button from "@mui/material/Button";
import HeaderComp from "./Components/HeaderComp";
import { useContext } from "react";
import { MetaDataListContext } from "./Context/DataContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import DrawerComp from "./Components/DrawerComp";
import { MetaData } from "./utils";
import DndDrawerComp from "./Components/DndDrawerComp";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import './App.css';



function App() {
  const { metaDataList, setMetaDataList } = useContext(MetaDataListContext);
  const [metaDataSelected, setMetaDataSelected] = useState(0);
  const [drawerState, setDrawerState] = useState(false);
  const [dndDrawerState, setDndDrawerState] = useState(false);

  const handleClick = (metadata: MetaData) => {
    setDrawerState(true);
    setMetaDataSelected(metadata.id);
  };
  const handleClick2 = () => {
    setDndDrawerState(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='front'>
        <HeaderComp />

   
       <div className = 'button-container'>
        <button className='button' onClick={handleClick2} >
        Organize Layout 
        </button>
      </div>
 

        <Drawer
          anchor="left"
          open={dndDrawerState}
          onClose={() => setDndDrawerState(false)}
        >
          <DndDrawerComp
            setDrawerState={setDndDrawerState}
            metaDataList={metaDataList}
            setMetaDataList={setMetaDataList}
          />
        </Drawer>
        <Drawer
          anchor="left"
          open={drawerState}
          onClose={() => setDrawerState(false)}
        >
          <DrawerComp
            setDrawerState={setDrawerState}
            metadataId={metaDataSelected}
          />
        </Drawer>
        {metaDataList.map((metadata) => (
          <button className='button-48'>
            <CardActionArea onClick={() => handleClick(metadata)}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div"sx= {{fontFamily: "Segoe UI" }}>
                <span>{metadata.label}</span> 
                </Typography>
              </CardContent>
            </CardActionArea>
          </button>
        ))}

      </div>
    </DndProvider>
  );
}

export default App;
