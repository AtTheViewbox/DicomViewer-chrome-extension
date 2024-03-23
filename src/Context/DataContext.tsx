import { createContext, useState, useEffect } from "react";
import { PropsWithChildren } from "react";
import * as cornerstone from "@cornerstonejs/core";
import * as cornerstoneTools from "@cornerstonejs/tools";
import { useChromeStorageLocal } from "use-chrome-storage";

//@ts-ignore
import cornerstoneDICOMImageLoader from "@cornerstonejs/dicom-image-loader";
import dicomParser from "dicom-parser";
import { generateMetaData, MetaData } from "../utils";

//export const DataContext = createContext();
interface MetaDataListContextProp {
  metaDataList: MetaData[];
  setMetaDataList: React.Dispatch<React.SetStateAction<MetaData[]>>;
  setValue: React.Dispatch<React.SetStateAction<MetaData[]>>;
}

export const RenderEngineContext = createContext<
  cornerstone.RenderingEngine | undefined
>(undefined);
export const MetaDataListContext = createContext<MetaDataListContextProp>({
  metaDataList: [],
  setMetaDataList: () => {},
  setValue: () => {},
});

export const DataProvider = ({ children }: PropsWithChildren<{}>) => {  
  const [metaDataList, setMetaDataList] = useState<MetaData[]>([]);
  const [renderingEngine, SetRenderingEngine] =
    useState<cornerstone.RenderingEngine>();
  const [value, setValue, isPersistent, error, isInitialStateResolved] =
    useChromeStorageLocal("PAC_DATA", []);
    
  useEffect(() => {
    const setupCornerstone = async () => {
      cornerstoneDICOMImageLoader.external.cornerstone = cornerstone;
      cornerstoneDICOMImageLoader.external.dicomParser = dicomParser;
      await cornerstone.init();
      await cornerstoneTools.init();

      const renderingEngineId = "myRenderingEngine";
      const re = new cornerstone.RenderingEngine(renderingEngineId);
      SetRenderingEngine(re);

      const {
        PanTool,
        WindowLevelTool,
        StackScrollTool,
        StackScrollMouseWheelTool,
        ZoomTool,
        PlanarRotateTool,
      } = cornerstoneTools;

      cornerstoneTools.addTool(PanTool);
      cornerstoneTools.addTool(WindowLevelTool);
      cornerstoneTools.addTool(StackScrollTool);
      cornerstoneTools.addTool(StackScrollMouseWheelTool);
      cornerstoneTools.addTool(ZoomTool);
      cornerstoneTools.addTool(PlanarRotateTool);
    };

    setupCornerstone();
  }, []);
  useEffect(() => {
    setMetaDataList(value);
    console.log(value)
  }, [value]);
  return (
    <RenderEngineContext.Provider value={renderingEngine}>
      
      <MetaDataListContext.Provider value={{ metaDataList, setMetaDataList,
        // @ts-ignore
        setValue }}>
        {children}
      </MetaDataListContext.Provider>
    </RenderEngineContext.Provider>
  );
};
