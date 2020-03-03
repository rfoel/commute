import React from 'react'
import styled from '@1e3/ui'

import { ReactComponent as ExclamationTriangle } from '../images/exclamation-triangle.svg'

const Loader = styled.div`
  color: white;
  width: 200px;

  svg {
    width: 100%;
  }
`

export default () => (
  <Loader>
    <ExclamationTriangle />
  </Loader>
)
