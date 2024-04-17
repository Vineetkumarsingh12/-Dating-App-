import React from 'react';
import Image from 'next/image';
import { FaInstagram } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <div className='flex flex-col gap-3 text-black'>
      <div className="avatar">
        <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <Image src={user?.avatar.url}  alt="profile" width={50} height={50}/>
        </div>
      </div>
    
      <ProfileCard text={user?.username} heading={"enjoy life"} Icon={FaInstagram} />
      
    </div>
  );
}

const ProfileCard = ({ text, Icon, heading }) => {
  return (
    <div className='flex justify-center items-center gap-3'>
      {Icon && (
        <div>
          <Icon />
        </div>
      )}
      <div>
        <p>{heading}</p>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Profile;
