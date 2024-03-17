import React from 'react';
import { memo } from 'react';
import moment from 'moment';
import Image from 'next/image';
import { fileFormate } from '../lib/features';
import RenderAttachment from './RenderAttachment';

const MessageComponent = ({ message, user }) => {
    const { sender, content, attachments = [], createdAt } = message;
    const sameSender = sender?._id === user?._id;
    console.log(sender._id+" "+user._id);
  const timeAgo=moment(createdAt).fromNow();
    return (
        <div className={` ${sameSender ? "self-end" : "self-start"}`}>
           {
                !sameSender && <div className="text-xs text-sky-500">{sender?.name}</div>
           }
           {
                content && <div className={`rounded-lg p-2 ${sameSender ? "bg-green-500" : "bg-gray-500"} text-white`}>
                     {content}
                </div>
              }
              {
                 attachments.length > 0 && attachments.map((attachment, index) => {
                    const url=attachment.url;
                    const formate=fileFormate(url);
                    return (
                        <div key={index}>
                        <a  href={url
                        } target="_blank" download >
                      
                            {
                                RenderAttachment(formate,url)
                            }
                        </a>
                        </div>
                    )
                 }
                  
                 
                 )
                     }
                     {
                    //time
                    <div className="text-xs text-white">{timeAgo}</div>

                     }
                </div>
           
       
    );
};

export default memo(MessageComponent);
