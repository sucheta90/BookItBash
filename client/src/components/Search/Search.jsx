import {Select, SelectItem, Input, Button} from "@nextui-org/react";
import musicGenres from "../data/music";

export default function SearchBar(){

     // might need in future 
     // const search = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?genreId=${genre}&locale=*&city=${zipcode}&apikey=6VG1H9q8TAXG27aR4KLRsAbAgg5pkAY1`);
    return (
        <>
          {/* <div className="flex w-full flex-wrap md:flex-nowrap gap-4 px-unit-4">

            <Select 
                label="Select by category" 
                className="max-w-xs" 
                value={genre}
                name="genre"
                onChange={handleChange}

            >
                {musicGenres.map((genre) => (
                <SelectItem key={genre.value} value={genre.value}>
                    {genre.title}
                </SelectItem>
                ))}
            </Select>
            <div className="flex w-half flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input size="md" type="zipcode" label="City" name="" value="" onChange={handleChange}/>
            </div>    
            <Button size="md" onClick={handleSubmit}>Find</Button>
        </div> */}
        </>
    )
}