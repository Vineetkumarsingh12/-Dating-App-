import React, { memo } from 'react';
import Link from 'next/link';
import AvatarCard from './AvtarCard';

const ChatItem = ({
    avatar = [],
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newAlertMessage,
    index = 0,
    handleDeleteChat,
}) => {
    return (
        <Link href={`/chat/${_id}`} onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}>
            <div className={`flex items-center p-[1rem] ${sameSender ? 'bg-black' : 'bg-white'} gap-[1rem] relative ${sameSender ? 'text-white' : 'text-black'} hover:bg-gray-400`} >
                <AvatarCard avatar={avatar} name={name} />
                <div className=''>
                    <p>{name}</p>
                    {
                        newAlertMessage && (
                            <p>
                                {newAlertMessage.count} New Message
                            </p>
                        )
                    }
                </div>
                {
                    isOnline && <div className="w-3 h-3 bg-green-500 rounded-full absolute right-2"></div>
                }
            </div>
        </Link>
    );
};

export default memo(ChatItem);
