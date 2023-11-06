import { useEffect, useState } from "react";
import { SingleReaction, type SingleReactionType } from "./SingleReaction";

export const Reactions = () => {
  const [reactions, setReactions] = useState<SingleReactionType[]>([]);
  let isHoldingMeta = false;

  useEffect(() => {
    const keypressCallback = (ev: KeyboardEvent) => {
      if (ev.metaKey) {
        document.body.style.cursor = `url('/custom-cursor.png'), pointer`;
        isHoldingMeta = true;
      } else {
        document.body.style.cursor = "auto";
        isHoldingMeta = false;
      }
    };

    const clickCallback = (ev: MouseEvent) => {
      if (isHoldingMeta) {
        console.log(ev.pageX, ev.pageY);

        setReactions((prev) =>
          prev.concat({
            left: ev.pageX,
            top: ev.pageY,
          })
        );
      }
    };

    window.addEventListener("keydown", keypressCallback);
    window.addEventListener("keyup", keypressCallback);
    window.addEventListener("click", clickCallback);

    return () => {
      window.removeEventListener("keydown", keypressCallback);
      window.removeEventListener("keyup", keypressCallback);
      window.removeEventListener("click", clickCallback);
    };
  }, []);

  return (
    <>
      {reactions.map((reaction) => (
        <SingleReaction
          key={`${reaction.left}-${reaction.top}`}
          {...reaction}
          setReactions={setReactions}
        />
      ))}
    </>
  );
  //   return <SingleReaction left={200} top={300} />;
};
