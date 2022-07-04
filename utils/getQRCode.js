import QRCodeStyling from "qr-code-styling";

const getQRCode = ({ qrCodeLink }) => {
  const qrCode = new QRCodeStyling({
    width: 200,
    height: 200,
    image: "http://localhost:3000/fire.png",
    dotsOptions: {
      color: "#1c1917",
      type: "rounded",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 5,
    },
  });

  qrCode
    .update({
      data: qrCodeLink,
    })
    .download({
      extension: "jpg",
    });
};

export default getQRCode;
