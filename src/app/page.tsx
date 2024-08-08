import { CreateNotes } from "./components/createNotes";
import { Header } from "./components/header";

export default function Home() {
  return (
    <main>
      <Header />
      <CreateNotes />
    </main>
  );
}
