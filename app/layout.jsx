import Footer from '@components/Footer';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/globals.css';
// import { Children } from 'react';

export const metadata = {
    title: 'RaffleWebsite',
    desciption: 'Win easy rewards'
}


const RootLayout = ({children}) => {
  return (
    <html lang="en">
        <body>
          <Provider>
          <div className='main'>
            <div className='gradient'/>
          </div>

          <main className='app'>
            <Nav/>
              {children}
            {/* <Footer/> */}
          </main>
          </Provider>
        </body>
    </html>
  )
}

export default RootLayout