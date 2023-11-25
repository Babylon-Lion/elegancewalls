'use client';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
const ProfileHeader = () => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h1 className="text-4xl font-semibold ">Profile</h1>
      <Button
        onClick={async () => {
          signOut({ callbackUrl: '/' });
        }}
      >
        {' '}
        <LogOut className="text-white" />{' '}
      </Button>
    </div>
  );
};

export default ProfileHeader;
