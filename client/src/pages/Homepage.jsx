import { useState } from "react";
import { Input, Button} from "@nextui-org/react";
import axios from "axios";



export default function Homepage() {

    // Actual searched value
    const [keyword, setKeyWord] = useState("")
    
    const handleChange = (e)=>{
        const target = e.target
        // this tracks the concert category
        if(target.name === "keyword"){
            const val = target.value;
            setKeyWord(val);
        } 
        
    }
    
    // Handles form submission logic
    const handleSubmit = async (e)=>{
       console.log(`inside handleSubmit`)
       let query = keyword
        
       const queryStr = query.split(" ").join("%20");

       const search = await axios.get(`https://app.ticketmaster.com/discovery/v2/events?apikey=6VG1H9q8TAXG27aR4KLRsAbAgg5pkAY1&keyword=${queryStr}&locale=*&classificationName=music&preferredCountry=us`);

        if (!search){
            console.log(`There was an error could not find info`)
            return
        }
        
        console.log('This is the result:',search.data._embedded.events);
      
       
       
    }

  return (
    <>  
        

        <div className="flex w-half flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input size="md" type="text" label="Search by Artist, Venue, City or State" name="keyword" value={keyword} onChange={handleChange}/>
        <Button size="md" onClick={handleSubmit}>Find</Button>
        </div>    
       
        
   </>
  );
}
