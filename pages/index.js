import { dehydrate, QueryClient, useQuery } from "react-query";
import { fetchGames } from "../utils/dataFetch";

export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("getGames", () => fetchGames());
  const data = queryClient.getQueryData("getGames");

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    notFound: !data,
  };
};

const Home = () => {
  const queryResult = useQuery(
    "Games",
    () => fetchGames()
  );
  const { data, isError, error } = queryResult;

  if (isError) {
    if (error.response.status == 404) {
      return <span>Not found...</span>;
    } else {
      return <span>Error...</span>;
    }
  }

  // {genre.image_background}
  // {tag.image_background}

  return (
    <div className="md:w-4/5 m-auto">
      {data && data.results.map(game =>
      (<article className="rounded-xl grid grid-cols-4 gap-2 bg-yellow-300 m-4 font-bold text-black md:grid-cols-5">
        <img className="col-span-4 md:col-span-1 rounded-t-xl md:rounded-tr-none md:rounded-l-xl md:object-cover md:h-full" src={game.background_image} />
        <div className="col-span-3 px-2 flex-col content-between mb-2">
          <div className="italic underline font-bold text-xl">{game.name}</div>
          <span>{game.released}</span>
          <div>
            {game.genres.map(genre => (
              <span className="inline-block border-red-600 border-4 px-2
              rounded-2xl mr-2 mb-2 text-red-600">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
        <div className="text-center flex justify-center items-center">
          <span className="bg-purple-700 rounded-full p-2 inline-block text-white">{game.rating}</span>
        </div>

      </article>))}
    </div>
  );
};

export default Home;

/*
bg-yellow-300
bg-red-600
bg-purple-700
bg-black
*/

/*
- add logo
- add input text-field + search
- scroll on mobile + button see more
- pagination for desktop
- create components
*/