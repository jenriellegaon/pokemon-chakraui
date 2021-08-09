/* eslint-disable react/no-unescaped-entities */
import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Flex 
      minH="100vh" 
      minW="100wv" 
      bg="white" 
      alignItems="center" 
      justifyContent="center" 
      flexDirection="column"
    >
      <Text fontSize="150px" color="black.500" lineHeight="160px" fontWeight="bold">
        404
      </Text>
      <Text fontSize="20px" color="black.500" mb={16}>
        Not found
      </Text>
      <Link className="link" to="/">
        <Text color="blue" style={{ textDecoration: "underline" }}>Go to home page</Text>
      </Link>
    </Flex>
  )
}

export default NotFound;
