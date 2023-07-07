
import React from 'react'

import Spinner from 'react-native-loading-spinner-overlay'


export const Loader = (visible) =>{
    return(

        <Spinner visible={visible}/>
    )

}