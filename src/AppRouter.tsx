import { BrowserRouter, Routes, Route } from "react-router-dom";
import CharactersPage from "./containers/ChatactersPage/ChatactersPage";
import { ROUTING } from "./constants/ROUTING";
import CharacterDetail from "./containers/CharacterDetail/CharacterDetail";


function AppRouter() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTING.CHARACTERS} element={<CharactersPage />} />
        <Route path={ROUTING.CHARACTER_DETAILS} element={<CharacterDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
