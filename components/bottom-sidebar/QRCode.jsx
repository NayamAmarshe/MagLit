import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { BASE_URL } from "../../utils/config";

const qrCode = new QRCodeStyling({
  width: 200,
  height: 200,
  image: BASE_URL + "fire.png",
  dotsOptions: {
    color: "#1c1917",
    type: "rounded",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 5,
  },
});

const QRCode = ({ qrCodeLink, instantDownload }) => {
  const [fileExt, setFileExt] = useState("png");
  const ref = useRef(null);

  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: qrCodeLink,
    });

    if (instantDownload) {
      qrCode.download({
        extension: fileExt,
        name: qrCodeLink.split("/")[3],
      });
    }
  }, [qrCodeLink]);

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt,
    });
  };

  return (
    <div className="mt-4 flex h-full w-full flex-col gap-2">
      <div ref={ref} className="mx-auto rounded-lg bg-white p-1" />
      <button className="submit-button" onClick={onDownloadClick}>
        Download Image
      </button>
    </div>
  );
};

export default QRCode;
