const accessKey = import.meta.env.VITE_BUNNY_ACCESS_KEY;

import axios from "axios";

const libraryId = "561988";

export const handleUpload = async (
  selectedFile: File,
  setVideoId: (id: string) => void,
  setUploadPercentage: (perc: number) => void,
  setIsSuccess: (loading: boolean) => void,
  setIsLoading: (loading: boolean) => void
) => {
  console.log(accessKey, "aces")
  if (!selectedFile) {
    console.error("Brak pliku");
    return;
  }

  try {
    setIsLoading(true);
    
    // 1️⃣ CREATE VIDEO
    const createVideoResponse = await axios.post(
      `https://video.bunnycdn.com/library/${libraryId}/videos`,
      {
        title: selectedFile.name, // ❗ NIE null
      },
      {
        headers: {
          AccessKey: accessKey,
          "Content-Type": "application/json",
        },
      }
    );

    const videoId = createVideoResponse.data.guid;
    setVideoId(videoId);

    // 2️⃣ UPLOAD VIDEO (RAW FILE)
    await axios.put(
      `https://video.bunnycdn.com/library/${libraryId}/videos/${videoId}`,
      selectedFile,
      {
        headers: {
          AccessKey: accessKey,
          "Content-Type": "application/octet-stream",
        },
        onUploadProgress: (e: any) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          console.log(`Upload: ${percent}%`);
          setUploadPercentage(percent);
        },
      }
    );

    console.log("Upload zakończony ✅");
    setIsSuccess(true);
    setIsLoading(false);
  } catch (error: any) {
    console.error("Błąd Bunny:", error.response?.data || error.message);
  }
};
