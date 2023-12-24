import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { Button } from '../ui/button'
import Image from 'next/image'

type FileUploaderProps = {
    fieldChange: (FILES: File[]) => void
    mediaUrl: string
    setCurrentFile?: Dispatch<SetStateAction<string>>
}

const FileUploader = ({ fieldChange, mediaUrl, setCurrentFile }: FileUploaderProps) => {
    const [ file, setFile ] = useState<File[]>([])
    const [ fileUrl, setFileUrl ] = useState(mediaUrl);

    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[]) => {
        setFile(acceptedFiles)
        fieldChange(acceptedFiles)
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
        if(setCurrentFile){
          setCurrentFile(URL.createObjectURL(acceptedFiles[0]))
        }
    }, [file])

      const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': [ '.png', '.jpg', '.jpeg', '.svg' ]
        }
    })
  return (
    <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>
      <input {...getInputProps()} className='cursor-pointer' />
      {
        fileUrl ? (
            <>
            <div className="flex flex-1 justify-center w-full">
                <Image 
                src={fileUrl}
                alt='image'
                width={375}
                height={375}
                className='aspect-square h-full w-full object-cover'
                />
            </div>
            </>
        ) : (
            <div className="w-full flex justify-center flex-col items-center h-[375px]">
                <Image 
                src="/assets/camera.svg" 
                width={96} 
                height={77} 
                alt="File upload"
                className='opacity-50'
                />
                <h3 className='text-xs font-semibold mt-4'>Drag photo here</h3>
                <p className='text-xs mt-1 font-semibold text-muted-foreground'>SVG, PNG, JPG</p>

                <Button variant="link" className='text-muted-foreground'>
                    Select manually
                </Button>
            </div>
        )
      }
    </div>
  )
}
export default FileUploader