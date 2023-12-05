export const getCustomerQuery = `
query getCustomer($customerAccessToken:String!,$after: String){
  
  customer(customerAccessToken:$customerAccessToken){
    email
    firstName
    lastName
    phone
    id
    addresses(first:1){
      nodes{
        firstName
        lastName
        phone
        address1
        address2
        zip
        country
        id
      }
    }
    orders(first:5,after: $after){
      pageInfo{
        hasNextPage
        endCursor
      }
      
      nodes{
        currentSubtotalPrice{
          amount
          currencyCode
        }
        statusUrl
        processedAt
        
        lineItems(first:10){
          nodes{
            title
            variant{
              image{
                url
              }
            
            }
            
          	
              
          }
        }
        
        
        
      }
    }
    
    
  }

}`;
