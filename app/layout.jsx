import Footer from '@components/footer';
import Header from '@components/header';
import '@styles/globals.css';
// import { Children } from 'react';

export const metadata = {
    title: 'RaffleWebsite',
    desciption: 'Win easy rewards'
}


const RootLayout = ({children}) => {
  return (
    <html lang="en">
        <body className='main'>
            <Header></Header>
            <main className='app'>
                {/* {Children} */}
                {children}
            </main>
            <Footer></Footer>
        </body>
    </html>
  )
}

export default RootLayout