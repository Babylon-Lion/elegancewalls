'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { handleCustomerReset } from 'lib/login';
import { toast } from '@/components/ui/use-toast';
const ResetPassword = () => {
  const path = usePathname();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState({
    password: '',
    confirmPassword: ''
  });
  //@ts-ignore
  const customerId = path?.match(/\/(\d+)\//)?.length >= 1 ? path?.match(/\/(\d+)\//)[1] : '';
  //@ts-ignore
  const resetToken = path?.match(/\/(\w+-\d+)/)?.length >= 1 ? path?.match(/\/(\w+-\d+)/)[1] : '';

  const handleReset = async () => {
    if (newPassword.password != newPassword.confirmPassword) {
      return toast({
        variant: 'destructive',
        description: 'Passwords do not match'
      });
    }

    if (newPassword.password.length < 8) {
      return toast({
        variant: 'destructive',
        description: 'Password should be longer than 8 characters'
      });
    }
    if (!customerId || !resetToken) {
      return toast({
        variant: 'destructive',
        description: 'Unexpected error'
      });
    }

    const data = await handleCustomerReset({
      resetToken: resetToken!,
      password: newPassword.password,
      customerId: customerId!
    });
    if (data) {
      toast({ description: 'Password has been changed successfully' });
      router.push('/');
    } else {
      toast({
        description: 'Unexpected error occured while reseting password',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-2xl font-semibold">Recover Password</h3>
      <Input
        placeholder="New password"
        type="password"
        onChange={(e) => {
          setNewPassword({ ...newPassword, password: e.target.value });
        }}
      />
      <Input
        placeholder="Confirm password"
        type="password"
        onChange={(e) => {
          setNewPassword({ ...newPassword, confirmPassword: e.target.value });
        }}
      />
      <Button onClick={handleReset}>Submit</Button>
    </div>
  );
};

export default ResetPassword;
