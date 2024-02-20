import { dataUrl, debounce, getImageSize } from "@/lib/utils";
import { CldImage } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

const TransformedImage = ({
  image,
  status,
  title,
  transformationConfig,
  type,
  hasDownload = false,
  setStatus,
}: TransformedImageProps) => {
  const downloadHandler = (e: any) => {};
  return (
    <div className="flex flex-col gap-4">
      <div className="flex-between">
        <h3 className="h3-bold text-dark-600">Transformed</h3>
        {hasDownload && (
          <button className="download-btn" onClick={downloadHandler}>
            <Image
              src="/assets/icons/download.svg"
              alt="download"
              width={24}
              height={24}
              className="pb-2"
            />
          </button>
        )}
      </div>

      {image?.publicId && transformationConfig ? (
        <div className="relative"></div>
      ) : (
        <div className="transformed-placeholder min-h-[18rem]">
          <CldImage
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            src={image?.publicId}
            alt="image"
            sizes={"(max-width:767px) 100vw, 50vw"}
            placeholder={dataUrl as PlaceholderValue}
            className="transformed-image"
            onLoad={() => {
              setStatus && setStatus("idle");
            }}
            onError={() => {
              debounce(() => {
                setStatus && setStatus("idle");
              }, 8000);
            }}
            {...transformationConfig}
          />

          {status === "transforming" && (
            <div>
              <Image
                src="/assets/icons/spinner.svg"
                width={50}
                height={50}
                alt="transforming"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TransformedImage;
