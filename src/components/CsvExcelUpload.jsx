import { useState,  useCallback, useRef } from "react";
import axios from "axios";
import { debounce } from "lodash"; 
import { ToastContainer, toast } from "react-toastify";

const CsvExcelUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const uploadFileToAPI = useCallback(
    debounce(async (file) => {
      if (!file) return;
      const formData = new FormData();
      formData.append("file", file);

      try {
        setUploading(true);
        const response = await axios.post(
          `${apiUrl}/v1/import`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },

            onUploadProgress: (progressEvent) => {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(progress);
            }
          }
        );

        toast.success("ファイルが正常にアップロードされました")
      } catch (error) {
        console.error("❌ Upload Error:", error);
          if (error.response && error.response.status === 500 && error.response.data.message.includes('Undefined array key "question_number"')) {
            toast.error("Excelの形式が間違っています。");
          } else {
            toast.error("ファイルのアップロードに失敗しました");
          }
      } finally{
        setUploading(false);
        setUploadProgress(0);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
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
        uploadFileToAPI(selectedFile);
      } 
    } 
  };
  
    return (
      <>
      <ToastContainer/>
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
                  ref={fileInputRef}
                />
              </form>

              {uploading && (
                <div className="my-1 py-[10px] px-[20px] bg-[#e0e0e0] text-[#000000] rounded-[5px]" role="alert">
                  アップロード中... {uploadProgress}%
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default CsvExcelUpload;