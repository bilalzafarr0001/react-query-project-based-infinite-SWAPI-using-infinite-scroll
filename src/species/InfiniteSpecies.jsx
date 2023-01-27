import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "react-query";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

 
export function InfiniteSpecies() {
  const { data , fetchNextPage , hasNextPage , isLoading , isFetching , isError, error} = useInfiniteQuery(
    "sw-species",
    ({pageParam =  initialUrl })=> fetchUrl(pageParam),
    {
      getNextPageParam : (lastPage) => lastPage.next ||  undefined
    }
  );

  if(isLoading) return <div className="loading">Loading ....</div>
  if(isError) return <div>{error.toString()}</div>

  // TODO: get data for InfiniteScroll via React Query
  return(
  <>
  {isFetching &&   <div className="loading">Loading ..</div>}
   <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
    {
      data.pages.map((pageData)=>{
       return pageData.results.map((specie)=>{
         return  <Species key={specie.name}  name={specie.name} language={specie.language} averageLifespan={specie.average_lifesppan} />
        })
      })
    }
    
     </InfiniteScroll>
     </>
  )
}