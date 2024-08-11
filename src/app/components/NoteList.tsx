"use client";
import { notesContext } from "../../context/NoteContext";
import React from "react";
import NoteCard from "./NoteCard";
export default function NotesList() {
  const { favorites, others } = notesContext();
  return (
    <div className="sm:px-24 sm:m-6">
      {favorites.length > 0 && <p className="pl-[83px] sm:pl-5 pb-1 text-sm">Favoritas</p>}
      <div className="gap-6 flex flex-wrap sm:justify-start justify-center w-full">
        {favorites.map((note) => (
          <NoteCard note={note} key={note.id} />
        ))}
      </div>
      {others.length > 0 && favorites.length > 0 && (
        <p className="pl-[83px] sm:pl-5 text-sm pb-1 pt-6">Outras</p>
      )}
      <div className="gap-6 flex flex-wrap sm:justify-start justify-center w-full">
        {others.map((note) => (
          <NoteCard note={note} key={note.id} />
        ))}
      </div>
    </div>
  );
}
