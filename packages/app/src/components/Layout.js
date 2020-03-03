import React from 'react'
import { node } from 'prop-types'
import styled, { css, layout } from '@1e3/ui'

import GlobalStyle from './GlobalStyle'

const Container = styled.box(
  ({
    theme: {
      colors: { primary },
    },
  }) => css`
    align-items: center;
    background-color: ${primary.base};
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
  `,
)

const Layout = ({ children }) => (
  <Container>
    <GlobalStyle />
    {children}
  </Container>
)

Layout.propTypes = {
  children: node.isRequired,
}

export default Layout
