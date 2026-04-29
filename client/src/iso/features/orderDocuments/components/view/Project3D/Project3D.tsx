import { Download, FileArchive, Box } from "lucide-react";
import * as S from "./Styles"; // Zakładam, że masz plik ze stylami

interface Project3DProps {
    data: {
      fileUrl: string;
      originalName?: string;
      fileType?: string;
      uploadedAt?: string;
    };
}

const Project3D = ({ data }: Project3DProps) => {
  const { fileUrl, originalName, fileType } = data;

  const handleDownload = () => {
    if (fileUrl) window.open(fileUrl, "_blank");
  };

  const isStl =
    fileType === "stl" || originalName?.toLowerCase().endsWith(".stl");

  return (
    <S.ProjectContainer>
      <S.ProjectInfo>
        <S.IconWrapper>
          {isStl ? (
            <Box size={32} color="#2c50dc" />
          ) : (
            <FileArchive size={32} color="#2c50dc" />
          )}
        </S.IconWrapper>
        <div>
          <S.FileName>{originalName || "Załącznik techniczny"}</S.FileName>
          <S.FileDetails>
            Format: {fileType?.toUpperCase() || "Nieznany"}
          </S.FileDetails>
        </div>
      </S.ProjectInfo>

      <S.DownloadButton onClick={handleDownload}>
        <Download size={18} />
        Pobierz plik
      </S.DownloadButton>
    </S.ProjectContainer>
  );
};

export default Project3D