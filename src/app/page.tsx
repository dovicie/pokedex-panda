import { css, cva } from "../../styled-system/css";
import { container, hstack, wrap } from "../../styled-system/patterns";
import {
  AspectRatio,
  Box,
  Container,
  VStack,
  Wrap,
  styled,
} from "../../styled-system/jsx";

export default function Home() {
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
          <Card name="フシギダネ" no="0001" types={["くさ", "どく"]} />
          <Card name="フシギバナ" no="0002" types={["くさ", "どく"]} />
          <Card name="フシギソウ" no="0003" types={["くさ", "どく"]} />
        </div>
      </main>
    </div>
  );
}

const Card = ({
  name,
  no,
  types,
}: {
  name: string;
  no: string;
  types: string[];
}) => {
  return (
    // patternsをfunctionではなくJSXでやってみる。 こっちのほうがスッキリ見えていいかも
    // でもJSXだと、すべてがdiv要素になっちゃう？？
    <Box bgColor="white" padding={2} width={200} rounded="md">
      <AspectRatio ratio={1 / 1} width="full" bgColor="blue.400"></AspectRatio>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          textAlign: "left",
        })}
      >
        {/* JSXで表現しにくいやつがあって、結局JSXとfunctionが混同する。Boxにするとすべてdivになるし */}
        <span>{no}</span>
        <span>{name}</span>
        <Wrap gap={1}>
          {types.map((type, index) => {
            return (
              <span
                key={index}
                className={css({
                  bgColor: "green.600",
                  color: "white",
                  width: "16",
                  fontSize: "xs",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  rounded: "sm",
                })}
              >
                {type}
              </span>
            );
          })}
        </Wrap>
      </div>
    </Box>
  );
};
