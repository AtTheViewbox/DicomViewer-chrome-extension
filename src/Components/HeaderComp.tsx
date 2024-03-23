import * as React from "react";
import Typography from "@mui/material/Typography";

const HeaderComp: React.VFC = () => {
  return (
    <div>
      <Typography variant="h5" sx={{ fontFamily: "Segoe UI" }}>
        DicomViewer URL Generator
      </Typography>
    </div>
  );
};
export default HeaderComp;
