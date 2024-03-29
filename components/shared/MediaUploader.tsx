import React, { Dispatch } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { dataUrl, getImageSize } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

interface MediaUploaderProps {
  onValueChange: (value: string) => void;
  setImage: Dispatch<any>;
  publicId: string;
  image: any;
  type: string;
}

const MediaUploader = ({
  onValueChange,
  setImage,
  publicId,
  image,
  type,
}: MediaUploaderProps) => {
  const { toast } = useToast();
  const onUploadSuccessHandler = (result: any) => {
    setImage((prevState: any) => ({
      ...prevState,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureUrl: result?.info?.secure_url,
    }));

    onValueChange(result?.info?.public_id);
    toast({
      title: "Image uploaded successfuly.",
      description: "1 credit was deducted from your account",
      className: "success-toast",
      duration: 5000,
    });
  };
  const onUploadErrorHandler = (result: any) => {
    toast({
      title: "Something went wrong while uploading",
      description: "Please try again",
      className: "error-toast",
      duration: 5000,
    });
  };
  return (
    <CldUploadWidget
      uploadPreset="imaginify"
      options={{
        multiple: false,
        resourceType: "image",
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
          <h3 className="h3-bold text-dark-600 ">Original</h3>
          {publicId ? (
            <>
              <div className="cursor-pointer overflow-hidden rounded-[10px] min-h-[18rem]">
                <CldImage
                  width={getImageSize(type, image, "width")}
                  height={getImageSize(type, image, "height")}
                  src={publicId}
                  alt="image"
                  sizes={"(max-width:767px) 100vw, 50vw"}
                  placeholder={dataUrl as PlaceholderValue}
                  className="media-uploader_cldImage"
                />
              </div>
            </>
          ) : (
            <div
              className="media-uploader_cta h-full  min-h-[18rem]"
              onClick={() => open()}
            >
              <div className="media-uploader_cta-image ">
                <Image
                  src="/assets/icons/add.svg"
                  alt="Add Image"
                  width={24}
                  height={24}
                />
              </div>
              <p className="p-14-medium">Click Here to Upload Image</p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default MediaUploader;
