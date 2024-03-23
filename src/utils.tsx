export interface MetaData {
  thumbnail: string;
  label: string;
  id: number;
  modality: string;
  prefix: string;
  suffix: string;
  start_slice: number;
  end_slice: number;
  max_slice: number;
  ww: number;
  wc: number;
  ci: number;
  z: number;
  px: string;
  py: string;
  r: number;
  pad: number;
  cord: number[];
}

export const initalValues = {
  thumbnail: "",
  label: "",
  id: 0,
  modality: "",
  prefix: "",
  suffix: "",
  start_slice: 1,
  end_slice: 0,
  ww: 0,
  wc: 0,
  ci: 1,
  z: 0,
  px: "0",
  max_slice: 0,
  py: "0",
  r: 0,
  pad: 0,
  cord: [-1, -1],
};

export function generateURL(data: MetaData) {
  const URL_genereated = new URL(
    "https://attheviewbox.github.io/TemplateStaticCornerstone3DViewport/"
  );

  URL_genereated.searchParams.append("m", "true");
  URL_genereated.searchParams.append("ld.r", "1");
  URL_genereated.searchParams.append("ld.c", "1");

  URL_genereated.searchParams.append(
    "vd.0.s.pf",
    encodeURI("dicomweb:" + data.prefix)
  );
  URL_genereated.searchParams.append("vd.0.s.sf", data.suffix);
  URL_genereated.searchParams.append("vd.0.s.s", data.start_slice.toString());
  URL_genereated.searchParams.append("vd.0.s.e", data.end_slice.toString());
  URL_genereated.searchParams.append("vd.0.ww", data.ww.toString());
  URL_genereated.searchParams.append("vd.0.wc", data.wc.toString());

  URL_genereated.searchParams.append("vd.0.ci", data.ci.toString());
  URL_genereated.searchParams.append("vd.1.z", data.z.toString());
  URL_genereated.searchParams.append("vd.1.px", data.px.toString());
  URL_genereated.searchParams.append("vd.1.py", data.py.toString());
  URL_genereated.searchParams.append("vd.1.r", data.r.toString());
  return URL_genereated.href;
}
export function generateGridURL(
  metaDataList: MetaData[],
  row: number,
  col: number
) {
  const URL_genereated = new URL(
    "https://attheviewbox.github.io/TemplateStaticCornerstone3DViewport/"
  );

  URL_genereated.searchParams.append("m", "true");
  URL_genereated.searchParams.append("ld.r", row.toString());
  URL_genereated.searchParams.append("ld.c", col.toString());

  metaDataList.map((data) => {
    if (data.cord[0] != -1 && data.cord[1] != -1) {
      let value = (data.cord[0] + 1 + col * data.cord[1] - 1).toString();
      URL_genereated.searchParams.append(
        "vd." + value + ".s.pf",
        encodeURI("dicomweb:" + data.prefix)
      );
      URL_genereated.searchParams.append("vd." + value + ".s.sf", data.suffix);
      URL_genereated.searchParams.append(
        "vd." + value + ".s.s",
        String(data.start_slice).padStart(data.pad, "0")
      );
      URL_genereated.searchParams.append(
        "vd." + value + ".s.e",
        String(data.end_slice).padStart(data.pad, "0")
      );
      URL_genereated.searchParams.append(
        "vd." + value + ".ww",
        data.ww.toString()
      );
      URL_genereated.searchParams.append(
        "vd." + value + ".wc",
        data.wc.toString()
      );

      URL_genereated.searchParams.append(
        "vd." + value + ".ci",
        data.ci.toString()
      );
      URL_genereated.searchParams.append(
        "vd." + value + ".z",
        data.z.toString()
      );
      URL_genereated.searchParams.append(
        "vd." + value + ".px",
        data.px.toString()
      );
      URL_genereated.searchParams.append(
        "vd." + value + ".py",
        data.py.toString()
      );
      URL_genereated.searchParams.append(
        "vd." + value + ".r",
        data.r.toString()
      );
    }
  });
  return URL_genereated.href;
}

function recreateVariableStringList(start_str: string, end_str: string) {
  const start = parseInt(start_str, 10);
  const end = parseInt(end_str, 10);
  const length = start_str.length;

  // Generate the list programmatically
  const generatedList = [];
  for (let i = start; i <= end; i++) {
    let numStr = i.toString();
    while (numStr.length < length) {
      numStr = "0" + numStr;
    }
    generatedList.push(numStr);
  }

  return generatedList;
}

export function recreateUriStringList(
  prefix: string,
  suffix: string,
  start_str: number,
  end_str: number,
  pad: number
) {
  const variableStringList = recreateVariableStringList(
    String(start_str).padStart(pad, "0"),
    String(end_str).padStart(pad, "0")
  );
  return variableStringList.map((str) => "dicomweb:" + prefix + str + suffix);
}
