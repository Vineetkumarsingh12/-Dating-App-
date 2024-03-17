import React from 'react';
import Image from 'next/image';
import {  transformImage } from '../lib/features';

const AvatarCard = ({ avatar = [], max = 4 }) => {
  // Determine the number of avatars to display
  const numAvatars = Math.min(avatar.length, max);

  return (
    <div className="avatar-group -space-x-8 rtl:space-x-reverse">
      {avatar.slice(0, numAvatars).map((av, index) => (
        <div key={index} className="avatar">
          <div className="w-8 h-8">
            <Image src={ transformImage(av)} width={40} height={40} alt={`Avatar ${index + 1}`} />
          </div>
        </div>
      ))}
         {/* {numAvatars < avatar.length && (
        <div className="avatar placeholder">
          <div className="w-8 h-8 bg-neutral text-neutral-content flex justify-center items-center">
            <span>+{avatar.length - numAvatars}</span>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default AvatarCard;
