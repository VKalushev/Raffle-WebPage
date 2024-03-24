import RaffleCard from "./RaffleCard";
export const dynamic = 'force-dynamic'

const RaffleCardsList = ({ data, onRaffleCardUpdate, createNewRaffle, archive }) => {
  if (!data || data.length === 0) {
    return null;
  }
  let activeRaffles = [];

  if(archive === false){
    activeRaffles = data.filter((raffle) => !raffle.archived);
  } else {
    const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(currentDate.getDate() - 30);
    activeRaffles = data.filter((raffle) => {return new Date(raffle.draw_date) >= sevenDaysAgo && raffle.archived});
  }

  return (
    <div className='prompt_layout'>
      {activeRaffles.map((raffle) => (
        <RaffleCard
          key={raffle._id}
          raffle={raffle}
          onRaffleCardUpdate={onRaffleCardUpdate}
          onCreateNewRaffle={createNewRaffle}
          archive={archive}
        />
      ))}
    </div>
  );
};

export default RaffleCardsList;
  