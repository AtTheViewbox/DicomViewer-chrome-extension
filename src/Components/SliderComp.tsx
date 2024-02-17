import { useState,useContext  } from 'react'
import { MetaDataListContext } from '../Context/DataContext';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { MetaData} from '../utils';
import { styled } from '@mui/material/styles';



const SliderS = styled(Slider)(({ theme }) => ({
  color: '#000000',
  height: 3,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 18,
    width: 18,
    backgroundColor: '#000000',
    border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(0, 0, 0, 0.16)',
    },
    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 2,
  },
  '& .MuiSlider-rail': {
    color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 2,
  },
}));
const minDistance = 10;

interface SliderProps {
  metadata:MetaData,

  stateFlag:boolean,
  setStateFlag:React.Dispatch<React.SetStateAction<boolean>>,
}

const SliderComp: React.VFC<SliderProps> = ({metadata,setStateFlag}) => {
  
  const {metaDataList,setMetaDataList}  = useContext(MetaDataListContext);
  const [max, setMax] =  useState<number>(metadata.max_slice);
  

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    setStateFlag(true)
    if (activeThumb === 0) {
 
      setMetaDataList([...metaDataList].map(object => {
        if(object.id === metadata.id) {
          return {
            ...object,
            start_slice: Math.min(newValue[0], metadata.end_slice - minDistance),
            end_slice:metadata.end_slice,
            ci: Math.max(metadata.ci, Math.min(newValue[0], metadata.end_slice - minDistance))
          }
        }
        else return object;
      }))

    } else {
      setMetaDataList([...metaDataList].map(object => {
        if(object.id === metadata.id) {
          return {
            ...object,
            start_slice: metadata.start_slice,
            end_slice: Math.max(newValue[1], metadata.start_slice + minDistance),
            ci: Math.min(metadata.ci, Math.max(newValue[1], metadata.start_slice + minDistance))
          }
        }
        else return object;
      }))
    }
  };

  return (
    <>
    <Box sx={{ width: 300 }} >
      <SliderS
        value={[metadata.start_slice,metadata.end_slice]}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        disableSwap
        max={max}
        min={1}
       
      />

    </Box>
    </>
  );
}
export default SliderComp