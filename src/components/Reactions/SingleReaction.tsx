import { type Dispatch, type SetStateAction, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { XIcon } from "lucide-react";

const emojis = ["👍", "🙌", "👏", "😄", "🤔"] as const;
type Emoji = (typeof emojis)[number];

export type SingleReactionType = {
  left: number;
  top: number;
  thread?: [
    {
      emojis: Emoji[];
      comment: string;
    }
  ];
};

export type SingleReactionProps = SingleReactionType & {
  setReactions: Dispatch<SetStateAction<SingleReactionType[]>>;
};

export const SingleReaction = ({
  left,
  top,
  thread,
  setReactions,
}: SingleReactionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedEmojis, setSelectedEmojis] = useState<Emoji[]>([]);

  return (
    <div className="flex gap-3 absolute z-[100]" style={{ left, top }}>
      <div
        className="bg-indigo-500 rounded-full rounded-tl-none w-4 h-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen ? (
        <>
          <div className="bg-primary-foreground flex flex-col rounded-sm overflow-hidden relative px-4 py-4 gap-4">
            <div className="flex gap-4 items-center">
              <Avatar>
                <AvatarImage src="https://github.com/brunocrosier.png" />
                <AvatarFallback>BC</AvatarFallback>
              </Avatar>
              <span className="font-semibold text-lg text-primary">
                Bruno Crosier
              </span>
            </div>
            <div className="flex gap-2">
              {emojis.map((emoji) => {
                return (
                  <Button
                    key={emoji}
                    variant={
                      selectedEmojis.includes(emoji) ? "default" : "secondary"
                    }
                    size="sm"
                    onClick={() => {
                      if (selectedEmojis.includes(emoji)) {
                        setSelectedEmojis((prev) =>
                          prev.filter((n) => n !== emoji)
                        );
                      } else {
                        setSelectedEmojis((prev) => prev.concat(emoji));
                      }
                    }}
                  >
                    {emoji}
                  </Button>
                );
              })}
            </div>
            <Textarea
              className="overflow-hidden"
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.currentTarget.value)}
            />
            <Button
              onClick={() => {
                setReactions((prevReactions) => {
                  const cloned = structuredClone(prevReactions);

                  console.log(cloned, top, left);

                  const foundIndex = cloned.findIndex(
                    (n) => n.left === left && n.top === top
                  );

                  if (typeof foundIndex !== "number") {
                    throw new Error("reaction not found");
                  }

                  cloned[foundIndex] = {
                    left,
                    top,
                    thread: [
                      {
                        comment,
                        emojis: selectedEmojis,
                      },
                    ],
                  };

                  return cloned;
                });

                setSelectedEmojis([]);
                setComment("");
                setIsOpen(false);
              }}
              disabled={selectedEmojis.length === 0 || !comment}
            >
              Save
            </Button>
            {thread
              ? thread.map((threadComment) => (
                  <p key={threadComment.comment} className="w-full">{threadComment.comment}</p>
                ))
              : null}
          </div>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full"
            onClick={() => setIsOpen(false)}
          >
            <XIcon />
          </Button>
        </>
      ) : null}
    </div>
  );
};
