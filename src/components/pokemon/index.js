/* eslint-disable no-nested-ternary */

// External imports
import React from 'react'
import PropTypes from 'prop-types'
import { Image, Text, VStack } from '@chakra-ui/react'

const Pokemon = ({
  id,
  name,
  size,
  image,
}) => {
  return (
    <VStack key={id}>
      <Text fontSize="36px" color="black.500">
        {name?.toUpperCase()}
      </Text>
      <Image
        boxSize={size}
        objectFit="cover"
        src={image}
        alt={name}
      />
    </VStack>
  )
}

Pokemon.defaultProps = {
    id: null,
    name: "Not found",
    size: "200px",
    image: "https://www.seekpng.com/png/full/150-1504180_pokemon-symbol-used-in-super-smash-bros-super.png",
}

Pokemon.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    size: PropTypes.string,
    image: PropTypes.string,
}

export default Pokemon
