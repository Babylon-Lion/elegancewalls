export const getBlogsQuery = `
{
    blogs(first:100,){
      pageInfo{
        endCursor
        hasNextPage
      }
      
    
      edges{
        
        node{
            handle
        
          
          authors{
            firstName
            lastName
          }
          
          
          title
          articles(first:100){
           nodes{
            seo{
                description
                title
              }
            publishedAt
            image{
              url
              altText
            }
            handle
            title
  
            contentHtml
            content
            
            
          } 
          }
          
        }
        
      }
      
    }
  }
  `;

export const getBlogQuery = `query getBlog($handle:String){
    blog(handle:$handle){
      articles(first:100){
        nodes{
            publishedAt
            seo{
                description
                title
              }
            image{
                url
                altText
                width
                height
              }
              handle
              title
              contentHtml
              content
        }
      }
      
    }
  }


`;
