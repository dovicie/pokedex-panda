import { css, cva } from "../../styled-system/css";
import { container, hstack, wrap } from "../../styled-system/patterns";
import { AspectRatio, VStack, Wrap } from "../../styled-system/jsx";
import { gql } from "@urql/core";
import { registerUrql } from "@urql/next/rsc";
import Image from "next/image";
import { urqlClient } from "@/lib/graphql";

const PokemonsQuery = gql`
  query Pokemons {
    pokemons(first: 151) {
      id
      number
      name
      types
      image
    }
  }
`;

const { getClient } = registerUrql(urqlClient);

type Pokemon = {
  id: string;
  number: string;
  name: string;
  types: PokemonType[];
  image: string;
};

type QueryResult = {
  data?: {
    pokemons: Pokemon[];
  };
  error?: any;
  extensions?: any;
};

type PokemonType =
  | "normal"
  | "grass"
  | "fire"
  | "water"
  | "electric"
  | "psychic"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

export default async function Home() {
  const result: QueryResult = await getClient().query(PokemonsQuery, {});
  return (
    <div>
      <header
        className={container({
          py: "4",
        })}
      >
        {/* 型安全に書けるけど、結局keyは安全だけど、valueは安全じゃない？？ TailwindCSSだと型はないけど、拡張機能で知らせてくれる */}
        <h1 className={css({ fontWeight: "bold", color: "slate.700" })}>
          ポケモン図鑑
        </h1>
      </header>
      <main
        className={container({
          py: "4",
          bgColor: "slate.300",
        })}
      >
        <div className={hstack({})}>
          <input
            type="text"
            className={css({
              width: "full",
              maxW: "sm",
              height: "8",
              px: "2",
              rounded: "md",
            })}
          />
          <button
            className={css({
              height: "8",
              px: "2",
              bgColor: "orange.600",
              color: "white",
              flexShrink: 0,
              rounded: "md",
            })}
          >
            検索
          </button>
        </div>
        <div className={wrap({ gap: "6", py: "4", justify: "center" })}>
          {result.data?.pokemons.map((pokemon: Pokemon) => (
            <Card
              key={pokemon.id}
              image={pokemon.image}
              name={pokemon.name}
              no={pokemon.number}
              types={pokemon.types}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

const Card = ({
  image,
  name,
  no,
  types,
}: {
  image: string;
  name: string;
  no: string;
  types: PokemonType[];
}) => {
  return (
    // patternsをfunctionではなくJSXでやってみる。 こっちのほうがスッキリ見えていいかも
    // でもJSXだと、すべてがdiv要素になっちゃう？？

    <VStack
      alignItems="start"
      gap={1}
      bgColor="white"
      padding={2}
      width={200}
      rounded="md"
    >
      <AspectRatio ratio={1 / 1} width="full">
        <Image
          className={css({ objectFit: "contain" })}
          src={image}
          fill
          sizes="(max-width: 425px) 100vw, (max-width: 610px) 50vw, (max-width: 800px) 33vw, 25vw"
          alt=""
        />
      </AspectRatio>
      {/* JSXで表現しにくいやつがあって、結局JSXとfunctionが混同する。Boxにするとすべてdivになるし */}
      <span className={css({ color: "slate.400", fontSize: "sm" })}>#{no}</span>
      <span>{name}</span>
      <Wrap gap={1}>
        {types.map((type, index) => {
          // タイプラベルの色をタイプによって動的に変えたいので、Recipeで表現
          // 慣れもあるけどコンポーネントで書いたほうが、明示的な気がする。
          return (
            <span
              key={index}
              className={typeLabel({
                type: type,
              })}
            >
              {type}
            </span>
          );
        })}
      </Wrap>
    </VStack>
  );
};

const typeLabel = cva({
  base: {
    width: "16",
    fontSize: "xs",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    rounded: "sm",
  },
  variants: {
    type: {
      normal: {
        bgColor: "slate.200",
        color: "black",
      },
      grass: {
        bgColor: "green.600",
        color: "white",
      },
      fire: {
        bgColor: "orange.500",
        color: "white",
      },
      water: {
        bgColor: "blue.500",
        color: "white",
      },
      electric: {
        bgColor: "yellow.500",
        color: "black",
      },
      psychic: {
        bgColor: "purple.500",
        color: "white",
      },
      ice: {
        bgColor: "cyan.500",
        color: "black",
      },
      fighting: {
        bgColor: "red.500",
        color: "white",
      },
      poison: {
        bgColor: "purple.700",
        color: "white",
      },
      ground: {
        bgColor: "yellow.700",
        color: "white",
      },
      flying: {
        bgColor: "blue.200",
        color: "black",
      },
      bug: {
        bgColor: "green.500",
        color: "white",
      },
      rock: {
        bgColor: "gray.700",
        color: "white",
      },
      ghost: {
        bgColor: "indigo.500",
        color: "white",
      },
      dragon: {
        bgColor: "purple.900",
        color: "white",
      },
      dark: {
        bgColor: "gray.800",
        color: "white",
      },
      steel: {
        bgColor: "gray.500",
        color: "black",
      },
      fairy: {
        bgColor: "pink.500",
        color: "black",
      },
    },
  },
});
