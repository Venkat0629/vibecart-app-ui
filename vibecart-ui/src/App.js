import React from 'react';
import {Routing} from './pages/routing/Routing'
import { SearchProvider } from './pages/Homepage/SearchContext';
const App = () => {
    return (
        <SearchProvider>
            <Routing />
        </SearchProvider>
    );
};

export default App;
