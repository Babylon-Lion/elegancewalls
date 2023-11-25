export const createCustomerMutation = `
 mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customer {
        id
      }
    }
  }
`;

export const createCustomerAccessToken = `
mutation customerAccessTokenCreate($input:CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input:$input){
    customerAccessToken{
      accessToken
      
    }
  }
  }


`;

export const updateCustomerMutation = `
mutation customerUpdate($input:CustomerInput!){
    customerUpdate(input:$input){
      userErrors{
        field
            message
  }
      
    }
  }`;

export const createCustomerAddressMutation = `
mutation customerAddressCreate($customerAccessToken: String!,$address: MailingAddressInput!) {
    customerAddressCreate(customerAccessToken:$customerAccessToken,address:$address){
      customerAddress{
        name
  }
      customerUserErrors{
        field
        code
        message
      }
    }
  }
  `;

export const updateCustomerAddressMutation = `
  mutation updateCustomerAddress($customerAccessToken:String!,$id:ID!,$address:MailingAddressInput!){
    customerAddressUpdate(customerAccessToken:$customerAccessToken,id:$id,address:$address){
      customerAddress{
        id
      }
      customerUserErrors{
        message
        field
      }
    }
  }
  
  `;

export const recoverCustomerEmailMutation = `
mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
      }
    }
  }`;

export const customerResetMutation = `
mutation customerReset($id: ID!, $input: CustomerResetInput!) {
    customerReset(id: $id, input: $input) {
      customer {
          email
      }
      customerAccessToken {
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
  `;
