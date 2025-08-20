import React, { useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';

function SearchSuggestions() {
  const [search, setSearch] = useState('');
  
  const boards = [
    {name:'@task', img:'https://graphicdesignjunction.com/wp-content/uploads/2024/08/minimal_logo_design_16.png', desc: 'Use gap-<number> utilities like gap-2 and gap-4 to change the gap between both rows and columns in grid and flexbox'},
    {name:'@next', img:'https://graphicdesignjunction.com/wp-content/uploads/2024/08/minimal_logo_design_25.png', desc: 'Utilities for controlling gutters between grid and flexbox items.'},
    {name:'@tony', img:'https://marketplace.canva.com/EAF6MXemLn4/2/0/1600w/canva-blue-minimalist-simple-real-estate-%26-architecture-logo-AHbQQSBzcVg.jpg', desc: 'This is just a shorthand for that adds the var() function for you automatically.'},
  ];

  const filteredBoards = boards.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full lg:w-150">
      <Command
        className="w-full file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
      >
        <CommandInput
          placeholder="Search boards..."
          value={search}
          onValueChange={setSearch}
        />

        {search.trim() && (
            <CommandList
            className="absolute top-full left-0 w-full bg-background  rounded-md z-50 max-h-60 overflow-auto"
            >

            <CommandEmpty>No boards found.</CommandEmpty>
            <CommandGroup heading="Boards">
              {filteredBoards.map((board, i) => (
                <CommandItem key={i}>
                    <div className='flex p-2 gap-5 items-center'>
                        <img src={board.img} className='w-10 h-10 rounded-sm'></img>
                        <div className='flex flex-col gap-1'>
                            <b>{board.name}</b>
                            <p className="line-clamp-2 text-xs text-muted-foreground">
                                {board.desc}
                            </p>
                        </div>
                    </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  );
}

export default SearchSuggestions;
