import { useEffect, useRef } from "react";

const canvasCenter = () => {
  // (A1) CREATE A REF TO THE CANVAS ELEMENT
  // This ref will give access to the canvas element in the DOM
  const canvasRef = useRef(null);

  useEffect(() => {
    // (A2) CREATE A NEW IMAGE OBJECT
    // This will be used to load and display an image onto the canvas
    const img = new Image();

    // (A3) HANDLE IMAGE LOAD EVENT
    // Once the image is fully loaded, proceed with the canvas operations
    img.onload = async () => {
      // (B1) CREATE NEW CANVAS CONTEXT
      // The canvas element is accessed via the ref, and a 2D drawing context is created
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // (B2) DRAW THE IMAGE ONTO THE CANVAS
      // The canvas size is set to match the image dimensions
      // Then, the image is drawn onto the canvas, covering the entire area
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

      // (B3) LOAD A CUSTOM FONT
      // A custom font is loaded asynchronously and added to the document's font collection
      const font = new FontFace("myFont", "url(/MaShanZheng-Regular.ttf)");
      await font.load();
      document.fonts.add(font);

      // (B4) SET TEXT STYLING PROPERTIES
      // The text to be drawn on the canvas is defined, along with its font, stroke color,
      // stroke width, and fill color
      const txt = "Gift Box";
      ctx.font = "60px myFont";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.fillStyle = "rgb(0, 0, 0)";

      // (B5) MEASURE TEXT DIMENSIONS & CALCULATE CENTER POSITION
      // The width and height of the text are measured to calculate its exact position
      // on the canvas so that it is centered both horizontally and vertically
      const txtdim = ctx.measureText(txt);
      const txtwidth = txtdim.width;
      const txtheight =
        txtdim.actualBoundingBoxAscent + txtdim.actualBoundingBoxDescent;
      const x = Math.floor((img.naturalWidth - txtwidth) / 2) + 11;
      const y = Math.floor((img.naturalHeight - txtheight) / 2) + 140;

      // (B6) DRAW TEXT ONTO THE CANVAS
      // The text is drawn onto the canvas at the calculated position,
      // first with an outline (stroke) and then filled with color
      ctx.strokeText(txt, x, y);
      ctx.fillText(txt, x, y);
    };

    // (C1) SET THE IMAGE SOURCE
    // This triggers the loading of the image, which will in turn trigger the onload event
    img.src = "./keychain.webp";
  }, []);

  // (D1) RENDER THE CANVAS ELEMENT IN THE DOM
  // The canvas element is rendered within a div, and its reference is passed using the ref attribute
  return (
    <div
      style={{
        backgroundImage: "url('./keychainBG.png')",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default canvasCenter;
