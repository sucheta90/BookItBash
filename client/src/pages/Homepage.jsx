
import {Select, SelectItem} from "@nextui-org/react";
import musicGenres from "../data/music";

export default function Homepage() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select 
        label="Select a genre" 
        className="max-w-xs" 
      >
        {musicGenres.map((genre) => (
          <SelectItem key={genre.value} value={genre.value}>
            {genre.title}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
