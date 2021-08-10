/* eslint-disable react/no-children-prop */
//* External imports
import React, { useCallback, useContext, useState } from 'react';
import {
  Flex,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  HStack,
  Fade,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  ModalFooter,
  SimpleGrid,
  useToast,
  Box,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon, RepeatIcon } from '@chakra-ui/icons';

import { isEmpty } from 'lodash';
import AsyncLocalStorage from '@createnextapp/async-local-storage'

//* Local imports
import { GlobalContext } from 'store/provider'
import {
  getPokemon,
  getPokemons,
  setPokemonTeam,
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
    pokemonTeam,
  } = state

  const myTeam = JSON.parse(localStorage.getItem('feature/team')) || pokemonTeam
  const [searchPokemon, setSearchPokemon] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const getRandomPokemon = () => {
    if (isEmpty(pokemons) && !isFetchingPokemons) return
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

  const onAddToTeam = useCallback(async () => {
    if (isEmpty(pokemon)) return

    try {
      if (myTeam.length > 5) {
        toast({
          title: "We have run out of pokéballs!",
          status: "error",
          duration: 3000,
          position: "bottom-left",
          isClosable: true,
        })
      } else {
        const data = {
          id: pokemon?.id,
          name: pokemon?.name,
          image: pokemon?.sprites?.other?.["official-artwork"]?.front_default,
        }
        myTeam.push(data)
        setPokemonTeam(myTeam)(dispatch)
        await AsyncLocalStorage.setItem("feature/team", JSON.stringify(myTeam))
    
        toast({
          title: `Successfully captured ${pokemon?.name}.`,
          status: "success",
          duration: 3000,
          position: "bottom-left",
          isClosable: true,
        })
      }
    } catch (error) {
      console.error("Error: ", error)
    }
  }, [pokemonTeam, pokemon, myTeam])

  const onRemoveFromTeam = async (key) => {
    const team = myTeam?.filter((_value, i) => i !== key)
    console.log("key: ", key)
    console.log("team: ", team)
    setPokemonTeam(team)(dispatch)
    await AsyncLocalStorage.setItem("feature/team", JSON.stringify(team))
  }

  // On mount
  useMount(() => {
    getPokemons()(dispatch)
    getPokemon(1)(dispatch)
  })

  return (
    <>
      <Flex minH="100vh" maxW="100wv" flexDirection="column">
        <Flex maxH="70px" w="100%" px={4} py={3} bg={(!isEmpty(pokemon) ? pokemon?.types[0].type?.name : "black.100")} justifyContent="space-between">
          <HStack>
            <Button onClick={() => onOpen()}>
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
                  text="Throw pokéball"
                  variant="solid"
                  textColor="white"
                  backgroundColor={(!isEmpty(pokemon) ? pokemon?.types[0].type?.name : "black.100")}
                  interactive="4px"
                  onClick={() => onAddToTeam(pokemon?.id)}
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
                  disabled={(pokemon?.id === pokemons?.count) || isEmpty(pokemon)}
                />
              </Flex>
            </Fade>
          </VStack>
        </Flex>
      </Flex>
      <Modal onClose={onClose} size={3} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent w="auto" minW="1080px" maxW="1080px">
          <ModalHeader>My Team</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {
              myTeam?.length === 0 ? (
                <Box justifyContent="center" w="full" h="full">
                  No pokemons.
                </Box>
              ) : (
                <SimpleGrid columns={3} spacing={16}>
                  {
                    myTeam?.map((value, i) => (
                      <VStack key={i}>
                        <Pokemon 
                          id={value?.id} 
                          name={value?.name} 
                          image={value?.image} 
                          size="150px"
                        />
                        <CustomButton
                          text="Remove pokémon"
                          variant="solid"
                          textColor="gray.700"
                          backgroundColor="white"
                          interactive="4px"
                          onClick={() => onRemoveFromTeam(i)}
                          disabled={isEmpty(value)}
                          isLoading={isFetchingPokemon}
                        />
                      </VStack>
                    ))
                  }
                </SimpleGrid>
              )
            }
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default App;
