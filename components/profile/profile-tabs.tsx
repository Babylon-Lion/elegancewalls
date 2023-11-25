'use client';
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AccountDetails from './tabs/account-details';
import PurchaseHistory from './tabs/purchase-history';
import { Customer } from 'lib/shopify/types';
import { signOut } from 'next-auth/react';

const ProfileTabs = ({
  customer,
  customerAccessToken
}: {
  customer: Customer;
  customerAccessToken: string;
}) => {
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    if (!customer) {
      signOut({ callbackUrl: '/' });
    }
  }, [customer]);

  return (
    <div>
      <Tabs
        defaultValue="personal"
        className="w-full font-main"
        onValueChange={(val) => {
          setActiveTab(val);
        }}
      >
        <TabsList>
          <TabsTrigger
            value="personal"
            className={`  ${
              activeTab === 'personal' ? 'bg-orange text-white' : ' '
            } mx-5 font-semibold uppercase`}
          >
            Information{' '}
          </TabsTrigger>
          <TabsTrigger
            value="purchase"
            className={`  ${
              activeTab === 'purchase' ? 'bg-orange text-white' : ' '
            } mx-5 font-semibold uppercase`}
          >
            Orders
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <AccountDetails customer={customer} customerAccessToken={customerAccessToken} />
        </TabsContent>
        <TabsContent value="purchase">
          <PurchaseHistory customer={customer} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
