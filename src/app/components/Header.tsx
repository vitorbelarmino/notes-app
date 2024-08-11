"use client";
import Image from "next/image";
import noteIcon from "../../assets/note-icon.png";
import searchIcon from "../../assets/search-icon.png";
import closeIcon from "../../assets/close-icon.png";
import { useState } from "react";
import { notesContext } from "@/context/NoteContext";

export function Header() {
  const [search, setSearch] = useState("");
  const { searchNotes } = notesContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
    searchNotes(value);
  };

  return (
    <header>
      <div className="flex justify-between items-center px-6 py-2 bg-white">
        <div className="flex gap-3 items-center w-[100%] mr-2">
          <Image priority src={noteIcon} alt="note icon" width={36} />
          <p className="text-sm">CoreNotes</p>
          <div className="flex items-center border rounded-[3px] border-[#D9D9D9] h-7 bg-white ml-2 w-[314px] md:w-[530px] min-w-[140px] shadow-sm">
            <input
              type="text"
              value={search}
              onChange={handleChange}
              className="h-3 pl-2 text-xs focus:outline-none w-[100%]"
              placeholder="Pesquisar notas"
            />
            <span className="mr-2">
              <Image src={searchIcon} alt="search" width={13} />
            </span>
          </div>
        </div>
        <Image src={closeIcon} alt="closer" width={13} />
      </div>
    </header>
  );
}
