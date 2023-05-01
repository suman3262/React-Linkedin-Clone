import { Spinner, Stack } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
  return (
   <>
       <div className='w-28 h-28 flex justify-center items-center'>
         <Stack >
              <Spinner size='xl' />
         </Stack>
       </div>
   </>
  )
}

export default Loader