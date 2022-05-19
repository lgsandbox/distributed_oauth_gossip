import { ColorModeScript } from '@chakra-ui/react'
import Document, { Html, Head, Main, NextScript, Theme } from 'next/document'
import { ServerStyleSheet } from 'styled-components';
import { extendTheme } from '@chakra-ui/react'

// 2. i dont use themes this way can remove this someday but dont touch
// for now don't wanna break custmon document for charka/styled-components

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

export default class MyDocument extends Document {
  
  static getInitialProps({ renderPage }) {

    const sheet = new ServerStyleSheet();

    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />),
    );

    const styleTags = sheet.getStyleElement();

    return { ...page, styleTags };
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          {this.props.styleTags}
        </Head>
        <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}