import * as XLSX from "xlsx";
import { FaUpload } from "react-icons/fa";
import { useState } from "react";


const CsvExcelUpload = () => {
    const [excelFile, setExcelFile] = useState(null);
    const [typeError, setTypeError] = useState(null);
  
    const [excelData, setExcelData] = useState(null);
  
    const handleFile = (e) => {
      let fileTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
      ];
      let selectedFile = e.target.files[0];
      if (selectedFile) {
        if (selectedFile && fileTypes.includes(selectedFile.type)) {
          setTypeError(null);
          let reader = new FileReader();
          reader.readAsArrayBuffer(selectedFile);
          reader.onload = (e) => {
            setExcelFile(e.target.result);
          };
        } else {
          setTypeError("Excelファイルタイプのみを選択してください");
          setExcelFile(null);
        }
      } else {
        console.log("PLease select your file");
      }
    };
  
    const handleFileSubmit = (e) => {
      e.preventDefault();
      if (excelFile !== null) {
        const workbook = XLSX.read(excelFile, { type: "buffer" });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        setExcelData(data.slice(0, 11));
      }
    };
  
    return (
      <>
        <div>
          <h1 className="ml-[20px] font-semibold mb-5">CSV/Excelアップロード</h1>
  
          <div className="ml-[20px]">
            <h3 className="font-semibold">質問が記載されたCSV（or）Excelファイルをアップロード</h3>
  
            <div className="h-[30px] py-[5px] px-[20px]">
              <form className="flex items-center gap-[30px]" action="" onSubmit={handleFileSubmit}>
                <input
                  type="file"
                  className="text-[16px] w-full rounded-[5px] shadow-2xl outline-0"
                  required
                  onChange={handleFile}
                />
                <button className=" p-1 flex gap-[10px] justify-center items-center border border-[var(--bgc-sidenav)] w-[250px] bg-[var(--bgc-sidenav)] text-white text-[16px] shadow-2xl h-[30px] font-semibold rounded-[5px] hover:bg-white hover:text-[var(--bgc-sidenav)] hover:transition-all duration-1000" type="submit">
                  
                  <i>
                    <FaUpload />
                  </i>
                  アップロード
                </button>
              </form>
  
              {typeError && (
                <div className="my-1 py-[10px] px-[20px] bg-[#ffb3b3] text-[#ff0000] rounded-[5px]" role="alert">
                  {typeError}
                </div>
              )}
            </div>
  
            <div className="w-full my-[70px] mx-[10px] p-[50px] rounded-[5px] shadow-2xl">
              {excelData ? (
                <div className="w-full">
                  <table className="border-collapse w-full border border-[var(--bgc-sidenav)] rounded-[5px]">
                    <thead>
                      <tr className="border border-[var(--bgc-sidenav)]">
                        {Object.keys(excelData[0]).map((key) => (
                          <th className="border border-[var(--bgc-sidenav)]" key={key}>{key}</th>
                        ))}
                      </tr>
                    </thead>
  
                    <tbody className="border border-[var(--bgc-sidenav)]">
                      {excelData.map((individualExcelData, index) => (
                        <tr className="border border-[var(--bgc-sidenav)]" key={index}>
                          {Object.keys(individualExcelData).map((key) => (
                            <td className="border border-[var(--bgc-sidenav)]" key={key}>{individualExcelData[key]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="my-[65px] mx-[20px]">
                  ファイルをアップロードしてください。
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default CsvExcelUpload;