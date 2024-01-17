'use client';

import { useCallback, useState } from "react"
import { FileWithPath, useDropzone } from "react-dropzone"
import { Button, buttonVariants } from "../ui/button"
import { cn, convertFileToUrl } from "@/lib/utils"
import { Label } from "../ui/label";

type ProfileUploaderProps = {
    fieldChange: (files: File[]) => void
    mediaUrl: string
}

const ProfileUploader = ({ fieldChange, mediaUrl }: ProfileUploaderProps) => {
    const [file, setFile] = useState<File[]>([])
    const [fileUrl, setFileUrl] = useState<string>(mediaUrl)

    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[]) => {
          setFile(acceptedFiles);
          fieldChange(acceptedFiles);
          setFileUrl(convertFileToUrl(acceptedFiles[0]));
        },
        [file]
      );
    
      const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
          "image/*": [".png", ".jpeg", ".jpg"],
        },
      });
  return (
    <div
      {...getRootProps()}
      className="flex flex-col rounded-xl w-fit">
      <input {...getInputProps()} name="file" className="cursor-pointer" />

      {fileUrl ? (
        <>
          <div className="flex justify-center w-full mt-10">
            <img src={fileUrl} alt="image" className="rounded-full shrink-0 h-24 w-24 object-cover" height={95} width={95} />
          </div>
          <Label htmlFor="file" className={cn(buttonVariants({ variant: "link", size: "sm", className: "mt-0 text-blue-500 cursor-pointer"}))}>Change profile picture</Label>
        </>
      ) : (
        <div className="w-fit">
          <img
            src="/assets/icons/camera.svg"
            width={95}
            height={95}
            alt="file upload"
          />

          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag photo here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

          <Button type="button" className="shad-button_dark_4">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  )
}
export default ProfileUploader