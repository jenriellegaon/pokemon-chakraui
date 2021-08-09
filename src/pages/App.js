/* eslint-disable react/no-children-prop */
//* External imports
import React, { useContext, useEffect, useState } from 'react';
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
  getPokemons,
} from 'store/actions'

import { getRandomInt } from 'helpers/helpers'
import { useMount } from 'hooks'
import { Pokemon } from 'components';

function App() {
  const {
    dispatch,
    state,
  } = useContext(GlobalContext)

  const {
    pokemon,
    isFetchingPokemon,
    pokemons,
    isFetchingPokemons,
  } = state

  const [searchPokemon, setSearchPokemon] = useState('')

  const getRandomPokemon = () => {
    if (isEmpty(pokemons)) return
    getPokemon(getRandomInt(1, pokemons?.count + 1))(dispatch)
  }

  const onClickPrevNext = (key) => {
    getPokemon(key)(dispatch)
  }

  const onChange = (event) => {
    const { value } = event.target
    setSearchPokemon(value)
  }

  const onSearchPokemon = () => {
    getPokemon(searchPokemon?.toLowerCase())(dispatch)
    setSearchPokemon("")
  }

  // On mount
  useMount(() => {
    getPokemons()(dispatch)
  })

  useEffect(() => {
    getRandomPokemon()
  }, [pokemons])

  return (
    <Flex minH="100vh" maxW="100wv" flexDirection="column">
      <Flex maxH="70px" w="100%" px={4} py={3} bg={(!isEmpty(pokemon) ? pokemon?.types[0].type?.name : "black.100")} justifyContent="space-between">
        <HStack width="full">
          <InputGroup maxW="400px" mr={2}>
            <Input
              pr="4.5rem"
              placeholder="Search pokémon by id or name..."
              bg="white" 
              textColor="black.700" 
              _placeholder={{ color: "black.400" }}
              value={searchPokemon}
              onChange={(e) => onChange(e)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.target.value) {
                  onSearchPokemon()
                }
              }}
            />
            <InputRightElement width="4.5rem">
              <IconButton
                aria-label="search"
                h="1.75rem"
                size="sm"
                variant="solid"
                bg="white"
                color="black.500"
                _hover={{ bg: "white" }}
                _active={{
                  bg: "white",
                  borderColor: "white",
                }}
                _focus={{
                  boxShadow: "none"
                }}
                onClick={() => onSearchPokemon()}
                isDisabled={isEmpty(searchPokemon)}
                icon={<SearchIcon color="black.400" />}
              />
            </InputRightElement>
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
            isLoading={isFetchingPokemons || isFetchingPokemon}
            onClick={() => getRandomPokemon()}
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
            onClick={() => onClickPrevNext(pokemon?.id - 1)}
            icon={<ChevronLeftIcon />}
            disabled={(pokemon?.id === 1) || isEmpty(pokemon)}
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
            onClick={() => onClickPrevNext(pokemon?.id + 1)}
            icon={<ChevronRightIcon />}
            disabled={(pokemon?.id === pokemons?.count) || isEmpty(pokemon)}
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
