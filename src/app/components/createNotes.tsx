"use client";
import React, { useState } from "react";
import Image from "next/image";
import FavoriteOn from "../assets/favorite-on.png";
import FavoriteOff from "../assets/favorite-off.png";

export function CreateNotes() {
  const [favorite, setFavorite] = useState(false);
  const [noteInfo, setNoteInfo] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (value === "\n") {
      return;
    }
    setNoteInfo({ ...noteInfo, [name]: value });
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!noteInfo.title || !noteInfo.content) return;
    if (e.code === "Enter") {
      setNoteInfo({ title: "", content: "" });
    }
  };

  return (
    <div className="flex justify-center m-6">
      <div className="w-[390px] md:w-[530px] border-[#D9D9D9] border-[1px] rounded-[25px] sm:rounded-[3px] shadow-sm bg-white overflow-hidden">
        <div className="flex justify-between items-center px-4 pb-1 pt-2 border-b-2 border-[#D9D9D9]">
          <input
            type="text"
            placeholder="Título"
            name="title"
            value={noteInfo.title}
            onChange={handleChange}
            onKeyDown={handleSubmit}
            className="focus:outline-none placeholder:text-black placeholder:font-bold text-sm w-full"
          />
          <Image
            alt="favorite icon"
            className="cursor-pointer hover:scale-[110%]"
            src={favorite ? FavoriteOn : FavoriteOff}
            width={19}
            onClick={() => setFavorite(!favorite)}
          />
        </div>
        <textarea
          name="content"
          placeholder="Criar nota..."
          onChange={handleChange}
          onKeyDown={handleSubmit}
          value={noteInfo.content}
          className="resize-none h-11 w-full focus:outline-none px-4 pt-3 text-xs placeholder:text-xs"
        ></textarea>
      </div>
    </div>
  );
}
