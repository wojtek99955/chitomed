// routes/upload.js
const express = require("express");
const multer = require("multer");
const router = express.Router();
const sharp = require("sharp");
const upload = multer({
  storage: multer.memoryStorage(),
});

// ---------------------
// ENDPOINT DLA ZDJĘĆ
// ---------------------
router.post("/upload-image", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Brak pliku" });
console.log("file", req.file);
    const file = req.file;
    if (!file.mimetype.startsWith("image/")) {
      return res.status(400).json({ error: "Plik musi być obrazem" });
    }

    const url = await uploadToBunny(file.buffer, file.originalname, "lms");
    res.json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Błąd uploadu zdjęcia" });
  }
});



router.post("/upload-video", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Brak pliku" });

    const file = req.file;
    if (!file.mimetype.startsWith("video/")) {
      return res.status(400).json({ error: "Plik musi być filmem" });
    }

    const result = await uploadVideoToBunnyStream(
      file.buffer,
      file.originalname,
    );

    res.json({
      url: result.embedUrl, // lub inny format, który potrzebujesz
      videoId: result.videoId,
      libraryId: result.libraryId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Błąd uploadu filmu do Bunny Stream" });
  }
});

async function uploadVideoToBunnyStream(buffer, originalName) {
  const libraryId = 561988;
  const apiKey = process.env.BUNNY_STREAM_API_KEY;
  const apiBase = "https://video.bunnycdn.com";

  if (!libraryId || !apiKey) {
    throw new Error("Brak konfiguracji Bunny Stream (LIBRARY_ID lub API_KEY)");
  }

  const ext = originalName.split(".").pop()?.toLowerCase() || "mp4";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;

  try {
    // Krok 1: Utwórz obiekt wideo w bibliotece
    const createRes = await fetch(`${apiBase}/library/${libraryId}/videos`, {
      method: "POST",
      headers: {
        AccessKey: apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        title: safeName, // lub możesz przekazać tytuł z frontendu
        collectionId: null, // opcjonalnie ID kolekcji
        // Możesz dodać więcej pól: description, tags, etc.
      }),
    });

    if (!createRes.ok) {
      const errText = await createRes.text();
      throw new Error(
        `Błąd tworzenia obiektu wideo: ${createRes.status} - ${errText}`,
      );
    }

    const createData = await createRes.json();
    const videoId = createData.guid; // lub createData.id – sprawdź w docs, najczęściej guid

    if (!videoId) {
      throw new Error("Brak videoId w odpowiedzi Bunny Stream");
    }

    // Krok 2: Wrzuć plik wideo
    const uploadUrl = `${apiBase}/library/${libraryId}/videos/${videoId}`;

    const uploadRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        AccessKey: apiKey,
        "Content-Type": "application/octet-stream",
      },
      body: buffer,
    });

    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      throw new Error(`Błąd uploadu pliku: ${uploadRes.status} - ${errText}`);
    }

    // Po sukcesie Bunny zaczyna transkodować automatycznie
    // Publiczny URL embed / odtwarzacz:
    // https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}
    // lub direct: https://${libraryId}.mediadelivery.net/video/${libraryId}/${videoId}/...

    return {
      videoId,
      libraryId,
      embedUrl: `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}`,
      // Możesz zwrócić też thumbnailUrl, previewUrl itp. po jakimś czasie
    };
  } catch (err) {
    console.error("Błąd uploadu do Bunny Stream:", err);
    throw err;
  }
}



async function uploadToBunny(buffer, originalName, folder = "lms") {
  let ext = originalName.split(".").pop()?.toLowerCase() || "jpg";

  // Obsługiwane formaty – reszta zostanie skonwertowana do webp lub jpeg
  const supported = [
    "jpg",
    "jpeg",
    "png",
    "webp",
    "gif",
    "avif",
    "tiff",
    "heic",
    "heif",
  ];

  if (!supported.includes(ext)) {
    ext = "webp"; // fallback – konwertujemy na nowoczesny format
  }

  try {
    let image = sharp(buffer);

    // Odczytujemy metadane, żeby wiedzieć, czy to animowany GIF / czy ma przezroczystość
    const metadata = await image.metadata();

    // Kompresja + konwersja
    if (ext === "png" || ext === "gif") {
      // PNG / GIF → WebP (lepsza kompresja, zachowuje animacje i przezroczystość)
      image = image.webp({
        quality: 78, // 75–82 to sweet spot (widoczna oszczędność, jakość OK)
        effort: 4, // 4–6 – balans prędkość / kompresja
        lossless: false,
        nearLossless: false,
      });
      ext = "webp";
    } else if (ext === "jpg" || ext === "jpeg") {
      image = image.jpeg({
        quality: 78,
        mozjpeg: true, // lepsza kompresja jpeg
      });
    } else if (ext === "webp") {
      image = image.webp({ quality: 78, effort: 4 });
    } else if (ext === "avif") {
      image = image.avif({ quality: 65, effort: 4 }); // AVIF daje najmniejszy rozmiar
    } else {
      // Heic, tiff itp. → konwertujemy na webp
      image = image.webp({ quality: 78, effort: 4 });
      ext = "webp";
    }

    // Opcjonalnie: zawsze resize jeśli obraz jest za duży
    if (metadata.width && metadata.width > 1920) {
      image = image.resize({
        width: 1920,
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    // Konwertujemy do bufora
    const compressedBuffer = await image.toBuffer();

    // Generujemy bezpieczną nazwę z nowym rozszerzeniem
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;
    const bunnyPath = `${folder}/${safeName}`;

    const zoneName = "chitomed-files";
    const apiKey = process.env.BUNNY_KEY;
    const cdnUrl = "https://chitomed-files.b-cdn.net";

    const uploadUrl = `https://storage.bunnycdn.com/${zoneName}/${bunnyPath}`;

    const bunnyRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        AccessKey: apiKey,
        "Content-Type": "application/octet-stream",
      },
      body: compressedBuffer,
    });

    if (!bunnyRes.ok) {
      const errorText = await bunnyRes.text();
      throw new Error(`Bunny error: ${bunnyRes.status} - ${errorText}`);
    }

    return `${cdnUrl}/${bunnyPath}`;
  } catch (err) {
    console.error("Błąd kompresji/uploadu:", err);
    throw err;
  }
}

module.exports = { uploadToBunny };

module.exports = router;


