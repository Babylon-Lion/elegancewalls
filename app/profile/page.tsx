import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from 'lib/auth';
import { redirect } from 'next/navigation';
import { getCustomer } from 'lib/shopify';
import ProfileTabs from 'components/profile/profile-tabs';
import ProfileHeader from 'components/profile/profile-header';
const ProfilePage = async ({
  searchParams
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/');
  }

  const customer = await getCustomer({
    customerAccessToken: session.user.accessToken,
    after: searchParams?.after || null
  });

  return (
    <div className="container py-8">
      <ProfileHeader />
      <ProfileTabs customer={customer} customerAccessToken={session.user.accessToken} />
    </div>
  );
};

export default ProfilePage;
