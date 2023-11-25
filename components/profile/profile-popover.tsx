'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader, User } from 'lucide-react';
import { ChangeEvent, useState } from 'react';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { registerCustomer } from 'lib/login';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { handleCustomerRecover } from 'lib/login';
export const RegisterTab = () => {
  const [registerInput, setRegisterInput] = useState({
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;
    setRegisterInput({ ...registerInput, [id]: value });
  };

  const handleRegister = async () => {
    const error = await registerCustomer({
      email: registerInput.email,
      password: registerInput.password,
      secondPassword: registerInput.passwordConfirm
    });
    if (error) {
      toast({ variant: 'destructive', description: `Registration failed: ${error}` });
      // Handle the error appropriately, e.g., show an error message to the user
    } else {
      // Registration was successful
      toast({ description: 'Registration successful' });
    }
  };

  return (
    <>
      <Input placeholder="email" value={registerInput.email} onChange={handleChange} id="email" />
      <Input
        placeholder="password"
        type="password"
        value={registerInput.password}
        onChange={handleChange}
        id="password"
      />
      <Input
        placeholder="Confirm password"
        id="passwordConfirm"
        value={registerInput.passwordConfirm}
        onChange={handleChange}
        type="password"
      />
      <Button onClick={handleRegister} className="w-full bg-slate-900">
        Register
      </Button>
    </>
  );
};

export const LogInTab = () => {
  const [loginInput, setLoginInput] = useState({
    email: '',
    password: ''
  });
  const [recoverEmail, setRecoverEmail] = useState('');
  const [dialog, setDialog] = useState(false);
  const [loading, isLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;
    setLoginInput({ ...loginInput, [id]: value });
  };

  const handleLogIn = async () => {
    if (!loginInput.email || !loginInput.password) {
      return;
    }

    await signIn('credentials', {
      username: loginInput.email,
      password: loginInput.password,
      redirect: false
    }).then((res) => {
      if (res?.ok) {
        router.push('/profile');
      } else {
        toast({
          variant: 'destructive',
          description: 'Wrong email or password'
        });
      }
    });
  };

  const handleRecover = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!recoverEmail || !emailRegex.test(recoverEmail)) {
      return toast({
        variant: 'destructive',
        description: 'Please enter valid email'
      });
    }
    isLoading(true);
    await handleCustomerRecover(recoverEmail);

    isLoading(false);
    toast({
      description: 'Email reset link sent!'
    });
    setDialog(false);
  };
  return (
    <>
      <Input placeholder="email" id="email" value={loginInput.email} onChange={handleChange} />
      <Input
        placeholder="password"
        type="password"
        id="password"
        value={loginInput.password}
        onChange={handleChange}
      />
      <Dialog
        open={dialog}
        onOpenChange={() => {
          setDialog(!dialog);
        }}
      >
        <DialogTrigger>
          <p>Forgot password?</p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter your email address</DialogTitle>
            <DialogDescription>
              <Input
                placeholder="Email"
                onChange={(e) => {
                  setRecoverEmail(e.target.value);
                }}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className=""
              onClick={() => {
                setDialog(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-gold"
              onClick={() => {
                handleRecover();
              }}
            >
              {loading ? <Loader className="animate-spin" /> : 'Submit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button className="w-full bg-slate-900" onClick={handleLogIn}>
        Log In
      </Button>
    </>
  );
};

const LogIn = () => {
  const [activeTab, setActiveTab] = useState('login');
  const { data: session } = useSession();

  return (
    <>
      {!session?.user ? (
        <Popover>
          <PopoverTrigger className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
            <User className={'h-4 transition-all ease-in-out hover:scale-110 '} />
          </PopoverTrigger>
          <PopoverContent className="flex max-h-[350px] flex-col gap-5 overflow-y-auto   ">
            <Tabs
              defaultValue="login"
              className="w-full"
              onValueChange={(val) => {
                setActiveTab(val);
              }}
            >
              <TabsList>
                <TabsTrigger
                  value="login"
                  className={`  ${activeTab === 'login' ? 'bg-orange text-white' : ' '}`}
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className={`  ${activeTab === 'register' ? 'bg-orange text-white' : ' '}`}
                >
                  Register
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="flex flex-col gap-3">
                <LogInTab />
              </TabsContent>
              <TabsContent value="register" className="flex flex-col gap-3">
                <RegisterTab />
              </TabsContent>
            </Tabs>
          </PopoverContent>
        </Popover>
      ) : (
        <Link
          href={'/profile'}
          className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
        >
          {' '}
          <User className={'h-4 transition-all ease-in-out hover:scale-110 '} />
        </Link>
      )}
    </>
  );
};

export default LogIn;
