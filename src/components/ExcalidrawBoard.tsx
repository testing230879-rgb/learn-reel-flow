import { Excalidraw } from "@excalidraw/excalidraw";
import { useEffect, useState } from "react";

export const ExcalidrawBoard = () => {
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("excalidraw-data");
    if (saved) {
      setInitialData(JSON.parse(saved));
    }
  }, []);

  const handleChange = (elements: any, state: any) => {
    localStorage.setItem("excalidraw-data", JSON.stringify({ elements, state }));
  };

  return (
    <div className="h-full w-full">
      <Excalidraw
        initialData={initialData}
        onChange={handleChange}
        theme="dark"
      />
    </div>
  );
};
