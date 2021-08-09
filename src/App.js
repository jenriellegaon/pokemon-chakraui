/* eslint-disable react/no-children-prop */
//* External imports
import React, { useContext, useEffect } from 'react';
import {
  Flex,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  HStack,
  Fade,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon, RepeatIcon } from '@chakra-ui/icons';

import { isEmpty } from 'lodash';

//* Local imports
import { GlobalContext } from 'store/provider'
import {
  getPokemon,
} from 'store/actions'
import Pokemon from './components/pokemon';

function App() {
  const {
    dispatch,
    state,
  } = useContext(GlobalContext)

  const {
    pokemon,
    isFetchingPokemon,
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
    <Flex minH="100vh" maxW="100wv" flexDirection="column">
      <Flex maxH="70px" w="100%" px={4} py={3} bg={(!isEmpty(pokemon) ? pokemon?.types[0].type?.name : "black.100")} justifyContent="space-between">
        <HStack width="full">
          <InputGroup maxW="400px" mr={2}>
            <Input
              placeholder="Search pokémon by id or name..." 
              bg="white" 
              textColor="black.700" 
              _placeholder={{ color: "black.400" }}
            />
            <InputRightElement children={<SearchIcon color="black.400" />} />
          </InputGroup>
          <Button 
            leftIcon={<RepeatIcon />} 
            variant="solid" 
            color="black.500" 
            bg="white"
            _hover={{ bg: "white" }}
            _active={{
              bg: "white",
              borderColor: "white",
              top: "4px"
              
            }}
            _focus={{
              boxShadow: "none"
            }}
          > 
            Randomize
          </Button>
        </HStack>
        <HStack>
          <IconButton
            size="md"
            fontSize="lg"
            aria-label="back"
            variant="solid"
            bg="white"
            color="black.500"
            _hover={{ bg: "white" }}
            _active={{
              bg: "white",
              borderColor: "white",
              top: "4px"
              
            }}
            _focus={{
              boxShadow: "none"
            }}
            onClick={() => console.log("Previous")}
            icon={<ChevronLeftIcon />}
          />
          <IconButton
            size="md"
            fontSize="lg"
            aria-label="next"
            variant="solid"
            bg="white"
            color="black.500"
            _hover={{ bg: "white" }}
            _active={{
              bg: "white",
              borderColor: "white",
              top: "4px"
              
            }}
            _focus={{
              boxShadow: "none"
            }}
            onClick={() => console.log("Next")}
            icon={<ChevronRightIcon />}
          />
        </HStack>
      </Flex>
      <Flex minH="calc(100vh - 64px)" w="100%" p={3} bg="white">
        <HStack minW="full" justifyContent="center">
          <Fade in={!isFetchingPokemon}>
            <Pokemon 
              id={pokemon?.id} 
              name={pokemon?.name} 
              image={pokemon?.sprites?.other?.["official-artwork"]?.front_default} 
              size="400px"
              color={(!isEmpty(pokemon) ? pokemon?.types[0].type?.name : "black.100")}
              actionType="add"
              disabled={isEmpty(pokemon)}
              isLoading={isFetchingPokemon}
              onClick={() => console.log("Added to team: ", pokemon?.name)}
            />
          </Fade>
        </HStack>
      </Flex>
    </Flex>
  );
}

export default App;
