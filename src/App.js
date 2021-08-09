//* External imports
import React, { useContext, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  theme,
  Flex,
} from '@chakra-ui/react';

import { isEmpty } from 'lodash';

//* Local imports
import { GlobalContext } from 'store/provider'
import {
  getPokemon,
} from 'store/actions'

function App() {
  const {
    dispatch,
    state,
  } = useContext(GlobalContext)

  const {
    pokemon,
  } = state

  // On mount
  useEffect(() => {
    getPokemon(1)(dispatch)
  }, [])

  useEffect(() => {
    if (isEmpty(pokemon)) return
    console.log("Pokemon: ", pokemon)
  }, [pokemon])

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Flex minH="100vh" p={3} />
      </Box>
    </ChakraProvider>
  );
}

export default App;
