/* eslint-disable react/no-children-prop */
//* External imports
import React, { useContext, useEffect, useState } from 'react';
import {
  Flex,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  HStack,
  Fade,
  VStack,
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
import { Pokemon, CustomIconButton, CustomButton } from 'components';

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
        <HStack>
          <Button>
            My Team
          </Button>
        </HStack>
        <HStack w="full" alignContent="center" alignItems="center" justifyContent="flex-end">
          <CustomButton 
            text="Randomize"
            aria-label="randomize"
            leftIcon={<RepeatIcon />} 
            variant="solid"
            textColor="black.500"
            backgroundColor="white"
            interactive="4px"
            isLoading={isFetchingPokemons || isFetchingPokemon}
            onClick={() => getRandomPokemon()}
          />
          
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
              <CustomIconButton
                aria-label="search"
                variant="solid"
                textColor="white"
                backgroundColor="transparent"
                onClick={() => onSearchPokemon()}
                icon={<SearchIcon color="black.400" />}
                disabled={isEmpty(searchPokemon)}
              />
            </InputRightElement>
          </InputGroup>
        </HStack>
      </Flex>
      <Flex minH="calc(100vh - 64px)" w="100%" p={3} bg="white">
        <VStack minW="full" justifyContent="center">
          <Fade in={!isFetchingPokemon}>
            <Pokemon 
              id={pokemon?.id} 
              name={pokemon?.name} 
              image={pokemon?.sprites?.other?.["official-artwork"]?.front_default} 
              size="400px"
            />
            <Flex flexDirection="row" justifyContent="center" mt={8}>
              <CustomIconButton
                aria-label="back"
                variant="solid"
                textColor="white"
                interactive="4px"
                backgroundColor={(!isEmpty(pokemon) ? pokemon?.types[0].type?.name : "black.100")}
                onClick={() => onClickPrevNext(pokemon?.id - 1)}
                icon={<ChevronLeftIcon />}
                disabled={(pokemon?.id === 1) || isEmpty(pokemon)}
              />
              <CustomButton
                text="Add to team"
                variant="solid"
                textColor="white"
                backgroundColor={(!isEmpty(pokemon) ? pokemon?.types[0].type?.name : "black.100")}
                interactive="4px"
                onClick={() => console.log("Added to team: ", pokemon?.name)}
                disabled={isEmpty(pokemon)}
                isLoading={isFetchingPokemon}
                mx={3}
              />
              <CustomIconButton
                aria-label="next"
                variant="solid"
                textColor="white"
                interactive="4px"
                backgroundColor={(!isEmpty(pokemon) ? pokemon?.types[0].type?.name : "black.100")}
                onClick={() => onClickPrevNext(pokemon?.id + 1)}
                icon={<ChevronRightIcon />}
                disabled={(pokemon?.id === 1) || isEmpty(pokemon)}
              />
            </Flex>
          </Fade>
        </VStack>
      </Flex>
    </Flex>
  );
}

export default App;
