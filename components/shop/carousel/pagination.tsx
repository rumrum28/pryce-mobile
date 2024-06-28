import { View, Text } from 'react-native'
import React from 'react'
import { carousel } from '~/data/mock'
import Dot from './dot'

type PaginationProps = {
  paginationIndex: number
}

const Pagination = ({ paginationIndex }: PaginationProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        // height: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {carousel.map((_, index) => {
        return (
          <Dot index={index} key={index} paginationIndex={paginationIndex} />
        )
      })}
    </View>
  )
}

export default Pagination
