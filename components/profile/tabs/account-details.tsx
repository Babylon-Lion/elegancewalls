import { ChangeEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { handleCreateAddress } from 'lib/login';
import { Customer } from 'lib/shopify/types';
const AccountDetails = ({
  customer,
  customerAccessToken
}: {
  customer: Customer;
  customerAccessToken: string;
}) => {
  const [accountInfo, setAccountInfo] = useState(() => {
    const firstAddress = customer?.addresses?.nodes[0];

    return {
      firstName: firstAddress?.firstName ?? '',
      lastName: firstAddress?.lastName ?? '',
      phone: firstAddress?.phone ?? '',
      country: firstAddress?.country ?? '',
      address1: firstAddress?.address1 ?? '',
      address2: firstAddress?.address2 ?? '',
      zip: firstAddress?.zip ?? ''
    };
  });
  console.log(customer);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    setAccountInfo({ ...accountInfo, [id]: value });
  };

  const handleAddress = async () => {
    try {
      // Check if user address already exists, then update it
      await handleCreateAddress({
        customerAccessToken: customerAccessToken,
        accountInfo: accountInfo,
        id: customer.addresses.nodes[0]?.id
      });

      toast({
        variant: 'default',
        description: 'Customer details updated successfully!'
      });
    } catch (error) {
      toast({ variant: 'destructive', description: 'Error updating customer details:' });
      // Handle the error, show a toast, or perform other error handling logic
    }
  };

  return (
    <div className="mt-5 flex h-[350px] w-full flex-col gap-4 rounded-2xl bg-slate-900 p-5 md:w-1/2">
      <h2 className="text-orange font-secondary text-xl  font-semibold text-white">
        User Information
      </h2>
      <div className="flex gap-5">
        <Input
          placeholder="Firstname"
          id="firstName"
          onChange={handleChange}
          value={accountInfo.firstName}
          className="w-1/2"
        />
        <Input
          placeholder="Lastname"
          id="lastName"
          onChange={handleChange}
          value={accountInfo.lastName}
          className="w-1/2"
        />
        <Input
          placeholder="Phone"
          id="phone"
          onChange={handleChange}
          value={accountInfo.phone}
          className="phone"
        />
      </div>
      <h2 className="text-orange font-secondary text-xl  font-semibold text-white">Address</h2>
      <div className="flex gap-5">
        <Input
          placeholder="Country"
          id="country"
          onChange={handleChange}
          value={accountInfo.country}
          className="w-1/2"
        />
        <Input
          placeholder="Address1"
          id="address1"
          onChange={handleChange}
          value={accountInfo.address1}
          className="w-1/2"
        />
      </div>

      <div className="flex gap-5">
        <Input
          placeholder="Address2"
          id="address2"
          onChange={handleChange}
          value={accountInfo.address2}
          className="w-1/2"
        />
        <Input
          placeholder="Zip code"
          id="zip"
          onChange={handleChange}
          value={accountInfo.zip}
          className="w-1/2"
        />
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button
          onClick={() => handleAddress()}
          className=" hover:opacity-79 bg-gold text-black text-white hover:bg-gold"
        >
          {' '}
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default AccountDetails;
