import { useState,  useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash"; 
import { toast } from "react-toastify";

const CsvExcelUpload = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const uploadFileToAPI = useCallback(
    debounce(async (file) => {
      if (!file) return;

      setUploadStatus("アップロード中...");

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "https://reuvindevs.com/liff/public/api/import",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("ファイルが正常にアップロードされました")
        setUploadStatus("アップロード成功しました!");
      } catch (error) {
        console.error("❌ Upload Error:", error);
        toast.error("ファイルのアップロードに失敗しました")
        setUploadStatus("アップロードに失敗しました。");
      }
    }, 2000),
    []
  );

  const handleFile = (e) => {
    const fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        setExcelFile(selectedFile);

        uploadFileToAPI(selectedFile);
      } else {
        setTypeError("Excelファイル (.xls, .xlsx, .csv) のみを選択してください");
        setExcelFile(null);
      }
    } else {
      console.log("ファイルを選択してください");
    }
  };
  
    return (
      <>
        <div>
          <h1 className="ml-[20px] font-semibold mb-5">Excelアップロード</h1>
  
          <div className="ml-[20px]">
            <h3 className="font-semibold">アドバイスを書くための Excel ファイルをアップロードする</h3>
  
            <div className="h-[30px] py-[50px] px-[20px]">
              <form className="flex items-center gap-[30px]" action="">
                <input
                  type="file"
                  name="file"
                  className="text-[16px] w-full rounded-[5px] shadow-2xl outline-0 cursor-pointer"
                  required
                  onChange={handleFile}
                />
              </form>
  
              {typeError && (
                <div className="my-1 py-[10px] px-[20px] bg-[#ffb3b3] text-[#ff0000] rounded-[5px]" role="alert">
                  {typeError}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default CsvExcelUpload;