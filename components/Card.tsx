import {FC} from "react";

import { Flex } from '@chakra-ui/react'

export const Card: FC = ({children}) => (
    <Flex
        direction="column"
        justify="space-between"
        w="sm"
        m="4"
        p="4"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="gray.300"
        borderRadius="lg"
        boxShadow="sm"
        overflow="hidden"
    >
      {children}
    </Flex>
)
