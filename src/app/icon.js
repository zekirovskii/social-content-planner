import { ImageResponse } from "next/og";
import { TbHexagonLetterS } from "react-icons/tb";

export const contentType = "image/png";
export const size = { width: 64, height: 64 };

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <TbHexagonLetterS
          size={70}
          color="#ffffffff"
          aria-hidden
          style={{ display: "block" }}
        />
      </div>
    ),
    size
  );
}
