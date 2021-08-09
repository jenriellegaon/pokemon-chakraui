// External imports
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@chakra-ui/react'

const CustomButton = (props) => {
  const {
    text,
    textColor,
    backgroundColor,
    interactive,
  } = props

  return (
    <Button
      bg={backgroundColor}
      color={textColor}
      _hover={{ bg: backgroundColor }}
      _active={{
        bg: backgroundColor,
        borderColor: backgroundColor,
        top: interactive
      }}
      _focus={{
        boxShadow: "none"
      }}
      {...props}
    >
      {text}
    </Button>
  )
}

CustomButton.defaultProps = {
  text: '',
  textColor: '',
  backgroundColor: '',
  interactive: '',
}

CustomButton.propTypes = {
  text: PropTypes.string,
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  interactive: PropTypes.string,
}

export default CustomButton
