import { useEffect, useRef } from "react";

const CanvasStudy = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.onload = async() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

      ctx.font = "bold 48px Arial";
      ctx.fillStyle = "rgb(0, 0, 0)";
      ctx.fillText("Iced Coffee", 30, 220);
    };

    img.src = "./keychain.webp"; 
  }, []);

  return <canvas ref={canvasRef} />;
};

export default CanvasStudy;
