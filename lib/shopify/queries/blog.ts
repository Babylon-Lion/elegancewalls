export const getBlogsQuery = (after: string | null, before: string | null) =>
  `
query{
  blogs(first:1,){
    
    
  
    edges{
      
      
      node{
          handle
      
        
        authors{
          firstName
          lastName
        }
        
        
        title
        articles(first:9, ${after ? `after:"${after}",` : null}${
          before ? `before:"${before}",` : null
        }){
          pageInfo{
            endCursor
            startCursor
            hasPreviousPage
      hasNextPage
    }
         nodes{
          
          id
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
  `
    .replace(/null/g, '')
    .replace(/undefined/g, '');

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

export const getArticleQuery = `query getArticle($id:ID!){
  article(id:$id){

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
}`;
