import React from 'react'
import Image from 'next/image'
import {transformImage} from "../lib/features";
import { MdFileOpen } from "react-icons/md";
const RenderAttachment = (file,url) => {
    switch (file) {
        case 'image':
            return (
                <div>
                    <Image src={transformImage(url,200)} alt="image" width={100}
                    height={100} 
                    className=' object-contain'/>
                </div>
            )
        case 'video':
            return (
                <div>
                    <video src={url} controls 
                     width={"200px"} />
                </div>
            )
        case 'audio':
            return (
                <div>
                    <audio src={url} controls />
                </div>
            )
        default:
            return (
                <MdFileOpen />

            )
    }
  return (
    <div>
      
    </div>
  )
}

export default RenderAttachment
