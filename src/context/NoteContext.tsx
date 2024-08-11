"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ICreateNote, INote } from "../interfaces/INote";
import { Auth } from "./AuthContext";
import { api } from "@/api";
import { formatString } from "../utils/formatString";
import { noteSchema } from "./../schemas/noteSchema";
import { toast } from "react-toastify";

interface NotesContextType {
  notes: INote[];
  favorites: INote[];
  others: INote[];
  createNote: (Note: ICreateNote) => Promise<boolean | undefined>;
  updateNote: (note: INote) => Promise<boolean | undefined>;
  deleteNote: (note: INote) => Promise<void>;
  searchNotes: (text: string) => void;
}

const NotesContext = createContext({} as NotesContextType);
export const notesContext = () => useContext(NotesContext);
export default function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState([] as INote[]);
  const [favorites, setFavorites] = useState([] as INote[]);
  const [others, setOthers] = useState([] as INote[]);
  const { userId } = Auth();

  const getNotes = async () => {
    try {
      if (!userId) return;
      const { data } = await api.get(`/user/${userId}/notes`);

      setNotes(data.notes);
      filterNotes(data.notes);
    } catch (error) {
      console.error(error);
    }
  };

  const filterNotes = (Notes: INote[]) => {
    const favorite = [] as INote[];
    const other = [] as INote[];
    Notes.forEach((note) => {
      if (note.favorite) {
        favorite.push(note);
      } else {
        other.push(note);
      }
    });
    setFavorites(favorite);
    setOthers(other);
  };

  const createNote = async (note: ICreateNote) => {
    try {
      const { error } = noteSchema.validate({ title: note.title, content: note.content });
      if (error) {
        toast.error(error.message);
        return false;
      }
      const { data } = await api.post("/note/create", { ...note });
      setNotes([...notes, data]);
      filterNotes([...notes, data]);
      toast.success("Nota criada com sucesso");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const updateNote = async (note: INote): Promise<boolean | undefined> => {
    try {
      const { error } = noteSchema.validate({ title: note.title, content: note.content });
      if (error) {
        toast.error(error.message);
        return false;
      }
      await api.put(`/note/update/${note.id}`, {
        title: note.title,
        content: note.content,
        favorite: note.favorite,
        color: note.color,
      });
      getNotes();

      return true;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (note: INote) => {
    try {
      await api.delete(`/note/delete/${note.id}`);
      await getNotes();
      toast.success("Nota deletada com sucesso");
    } catch (error) {
      console.error(error);
    }
  };

  const searchNotes = (text: string) => {
    const formattedText = formatString(text);
    const filteredNotes = notes.filter((note) => {
      const formattedTitle = formatString(note.title);
      const formattedContent = formatString(note.content);
      return formattedTitle.includes(formattedText) || formattedContent.includes(formattedText);
    });
    filterNotes(filteredNotes);
  };

  useEffect(() => {
    getNotes();
  }, [userId]);
  return (
    <NotesContext.Provider
      value={{ notes, favorites, others, createNote, updateNote, deleteNote, searchNotes }}
    >
      {children}
    </NotesContext.Provider>
  );
}
