/* eslint-disable no-nested-ternary */

// External imports
import React from 'react'
import PropTypes from 'prop-types'
import { Image, Text, VStack, Button } from '@chakra-ui/react'

const Pokemon = ({
  id,
  name,
  size,
  image,
  onClick,
  actionType,
  color,
  disabled,
  isLoading,
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

      <Button
        color="white"
        bg={color}
        onClick={onClick}
        _hover={{ bg: color }}
        _active={{
          bg: color,
          borderColor: color,
          top: "4px"
          
        }}
        _focus={{
          boxShadow: "none"
        }}
        disabled={disabled}
        isLoading={isLoading}
      >
        {actionType === 'add' ? 'Add to team' : 'Remove'}
      </Button>
    </VStack>
  )
}

Pokemon.defaultProps = {
    id: null,
    name: "Not available",
    size: "200px",
    image: "https://www.seekpng.com/png/full/150-1504180_pokemon-symbol-used-in-super-smash-bros-super.png",
    onClick: () => {},
    actionType: "add",
    color: "black.100",
    isLoading: false,
}

Pokemon.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    size: PropTypes.string,
    image: PropTypes.string,
    onClick: PropTypes.func,
    actionType: PropTypes.string,
    color: PropTypes.string,
    isLoading: PropTypes.bool,
}

export default Pokemon
