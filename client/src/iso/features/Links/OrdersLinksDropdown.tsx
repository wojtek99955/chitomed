import { useState, useRef, useEffect } from "react";
import { PlusCircle, ChevronDown, Copy, CheckCircle2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast"; // DODANO IMPORT
import * as S from "./Styles";

const OrdersLinksDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const baseUrl = window.location.origin;

  const formLinks = [
    {
      id: "cyberbone-new",
      label: "Link: Nowy formularz Cyberbone",
      url: `${baseUrl}/cyberbone-order-form`,
    },
    {
      id: "novaoss-new",
      label: "Link: Nowy formularz NovaOss",
      url: `${baseUrl}/nova-oss-order-form`,
    },
  ];

  const handleCopy = async (url: string, linkId: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(linkId);

      // WYWOŁANIE TOASTA
      toast.success("Skopiowano link do schowka!", {
        duration: 3000,
        position: "bottom-right",
        style: {
          background: "#333",
          color: "#fff",
          fontSize: "14px",
          borderRadius: "8px",
        },
      });

      setTimeout(() => setCopiedLink(null), 3000);
    } catch (err) {
      toast.error("Błąd kopiowania!");
      console.error("Błąd kopiowania:", err);
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

  return (
    <S.DropdownContainer ref={dropdownRef} style={{ marginTop: "10px" }}>
      {/* Komponent Toaster musi być gdzieś w drzewie DOM, może być tutaj */}
      <Toaster />

      <S.DropdownButton
        onClick={() => setIsOpen(!isOpen)}
        $active={isOpen}>
        <PlusCircle size={21} />
        Nowe zamówienie
        <ChevronDown size={16} className="icon-right" />
      </S.DropdownButton>

      {isOpen && (
        <S.DropdownMenu>
          <S.DropdownHeader>Skopiuj link dla lekarza</S.DropdownHeader>
          {formLinks.map((form) => (
            <S.LinkItem key={form.id}>
              <div className="link-info">
                <strong>{form.label}</strong>
                <span
                  className="url-preview"
                  style={{ color: "#64748b", fontSize: "0.7rem" }}>
                  {form.url}
                </span>
              </div>
              <S.CopyButton
                onClick={() => handleCopy(form.url, form.id)}
                $copied={copiedLink === form.id}>
                {copiedLink === form.id ? (
                  <CheckCircle2 size={18} color="#15803d" />
                ) : (
                  <Copy size={18} color="#64748b" />
                )}
              </S.CopyButton>
            </S.LinkItem>
          ))}
        </S.DropdownMenu>
      )}
    </S.DropdownContainer>
  );
};

export default OrdersLinksDropdown;
