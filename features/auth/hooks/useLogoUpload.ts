import { useCallback, useEffect, useState } from "react";

export function useLogoUpload() {
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoName, setLogoName] = useState("");
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;

    setLogo(file);
    setLogoName(file.name);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);

      const file = e.dataTransfer.files[0];

      if (file) {
        handleFile(file);
      }
    },
    [handleFile],
  );

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setDragging(false);
  }, []);

  const removeLogo = useCallback(() => {
    setLogo(null);
    setLogoName("");
    setLogoPreview(null);
  }, []);

  useEffect(() => {
    if (!logo) {
      setLogoPreview(null);
      return;
    }

    const url = URL.createObjectURL(logo);
    setLogoPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [logo]);

  return {
    logo,
    logoPreview,
    logoName,
    dragging,
    handleFile,
    onDrop,
    onDragOver,
    onDragLeave,
    removeLogo,
  };
}
