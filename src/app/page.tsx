import { CreateNotes } from "./components/CreateNotes";
import { Header } from "./components/Header";
import NotesList from "./components/NoteList";

export default function Home() {
  return (
    <main>
      <Header />
      <CreateNotes />
      <NotesList />
    </main>
  );
}
