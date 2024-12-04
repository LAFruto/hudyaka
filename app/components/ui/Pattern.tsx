import { cn } from "~/lib/util";

interface PatternProps {
  flip?: boolean;
}

export default function Pattern({ flip = false }: PatternProps) {
  const colors = ["#A30420", "#FF9939", "#1E40AF"];

  return (
    <div
      className=" w-full h-[100px] flex overflow-hidden"
      style={{
        marginLeft: "-39px",
        width: "calc(100% + 82px)",
      }}
    >
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className={cn("min-w-[82px] max-h-[100px] relative")}
          style={{
            backgroundColor: colors[i % 3],
            clipPath: flip
              ? "polygon(50% 0%, 100% 50%, 100% 100%, 0% 100%, 0% 50%)"
              : "polygon(0% 0%, 100% 0%, 100% 55%, 50% 100%, 0% 55%)",
          }}
        />
      ))}
    </div>
  );
}
