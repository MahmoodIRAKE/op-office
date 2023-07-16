export async function getData(getUser,setDataIsLoaded){
   let data=await getUser();
   console.log(data);
   if(data){
    console.log(data);
    setDataIsLoaded(true);
   }
   console.log(data);
   return data;
}