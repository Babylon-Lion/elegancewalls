import { createCustomer } from 'lib/shopify';
import { createCustomerAddress, updateCustomerAddress } from 'lib/shopify';
import { recoverCustomerEmail } from 'lib/shopify';
import { customerReset } from 'lib/shopify';
export const registerCustomer = async ({
  email,
  password,
  secondPassword
}: {
  email: string;
  password: string;
  secondPassword: string;
}) => {
  // Validation for email
  if (!email || !isValidEmail(email)) {
    return 'Invalid email address';
  }

  // Validation for password
  if (!password || !isValidPassword(password)) {
    return 'Invalid password';
  }

  // Validation for secondPassword
  if (password !== secondPassword) {
    return 'Passwords do not match';
  }

  // All validations passed, create the customer
  await createCustomer({ input: { email, password } });

  // Return null if registration is successful
  return null;
};
const isValidEmail = (email: string): boolean => {
  // Add your email validation logic here
  // For a basic example, you can use a regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to validate password format
const isValidPassword = (password: string): boolean => {
  // Add your password validation logic here
  // For a basic example, you can check if the password has a minimum length
  return password.length >= 8;
};

export const handleCustomerRecover = async (email: string) => {
  await recoverCustomerEmail({ email: email });
};

export const handleCreateAddress = async ({
  customerAccessToken,
  accountInfo,
  id
}: {
  customerAccessToken: string;
  accountInfo: any;
  id: string | undefined;
}) => {
  if (id) {
    await updateCustomerAddress({
      customerAccessToken: customerAccessToken,
      address: accountInfo,
      id: id
    });
  } else {
    await createCustomerAddress({
      customerAccessToken: customerAccessToken,
      address: accountInfo
    });
  }
};

export const handleCustomerReset = async ({
  resetToken,
  password,
  customerId
}: {
  resetToken: string;
  password: string;
  customerId: string;
}) => {
  const reset = await customerReset({
    resetToken: resetToken,
    newPassword: password,
    customerId: 'gid://shopify/Customer/' + customerId
  });

  if (reset) {
    return true;
  } else {
    return false;
  }
};
