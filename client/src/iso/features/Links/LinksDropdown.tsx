import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link2, Copy, CheckCircle2, ChevronDown } from "lucide-react";
import * as S from "./Styles"; // Pamiętaj o dodaniu stylów poniżej
import { useOrderDocuments } from "../orderDocuments/api/useOrderDocuments";

const LinksDropdown = () => {
  const { id } = useParams<{ id: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const baseUrl = window.location.origin;
  const { data: docs } = useOrderDocuments(id);

  const dicomUrl = docs?.find(
    (doc) => doc.documentType === "CyberboneOrderForm",
  )?.data?.dicomUrl;

  const links = [
    dicomUrl ? { id: "DICOM", label: "Link: Plik DICOM", url: dicomUrl } : null,
    {
      id: "medical-event",
      label: "Link: Zdarzenie medyczne",
      url: `${baseUrl}/medical-event/${id}`,
    },
    {
      id: "pmcf-survey",
      label: "Link: Ankieta PMCF",
      url: `${baseUrl}/pmcf/${id}`,
    },
  ].filter(Boolean) as { id: string; label: string; url: string }[];

  const handleCopy = async (url: string, linkId: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(linkId);
      setTimeout(() => setCopiedLink(null), 3000);
    } catch (err) {
      console.error("Błąd kopiowania:", err);
      alert("Nie udało się skopiować linku automatycznie.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!id) return null;

  return (
    <S.DropdownContainer ref={dropdownRef}>
      <S.DropdownButton onClick={() => setIsOpen(!isOpen)} $active={isOpen}>
        <Link2 size={16} className="icon-left" />
        Generuj linki udostępniania
        <ChevronDown size={16} className="icon-right" />
      </S.DropdownButton>

      {isOpen && (
        <S.DropdownMenu>
          <S.DropdownHeader>Udostępnij zewnętrzne formularze</S.DropdownHeader>

          {links.map((link) => (
            <S.LinkItem key={link.id}>
              <div className="link-info">
                <strong>{link.label}</strong>
                <span className="url-preview">{link?.url}</span>
              </div>

              <S.CopyButton
                onClick={() => handleCopy(link.url, link.id)}
                title="Skopiuj link do schowka"
                $copied={copiedLink === link.id}>
                {copiedLink === link.id ? (
                  <CheckCircle2 size={18} color="#15803d" />
                ) : (
                  <Copy size={18} color="#64748b" />
                )}
              </S.CopyButton>
            </S.LinkItem>
          ))}

          <S.DropdownFooter>
            Linki są unikalne dla każdego zamówienia (ID: {id}).
          </S.DropdownFooter>
        </S.DropdownMenu>
      )}
    </S.DropdownContainer>
  );
};

export default LinksDropdown;
