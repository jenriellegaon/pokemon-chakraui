// External imports
import React from 'react'
import PropTypes from 'prop-types'
import { IconButton } from '@chakra-ui/react'

const CustomIconButton = (props) => {
  const {
    textColor,
    backgroundColor,
    interactive,
  } = props

  return (
    <IconButton
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
    />
  )
}

CustomIconButton.defaultProps = {
  textColor: '',
  backgroundColor: '',
  interactive: '',
}

CustomIconButton.propTypes = {
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  interactive: PropTypes.string,
}

export default CustomIconButton
