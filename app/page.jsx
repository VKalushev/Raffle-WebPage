import Raffles from '@components/Raffles';

const Home = () => {
  return (
    <div>
    <section className="bg-orange-600 flex-center flex-col w-screen p-8">
            <h1 className=" text-white head_text text-center py-4 ">Welcome to the Raffle</h1>
            <p className="desc text-center">Participate in our exciting raffles and stand a chance to win amazing prizes! Multiple games every hour with the opportunity to enter multiple times and even with your lucky numbers. </p>
            
    </section>

    <Raffles></Raffles>
    </div>
  )
}

export default Home