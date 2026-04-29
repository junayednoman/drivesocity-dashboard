import Image, { StaticImageData } from "next/image";

type StatCardProps = {
  title: string;
  value: number | string;
  icon: StaticImageData;
  alt?: string;
};

export default function StatCard({ title, value, icon, alt = "" }: StatCardProps) {
  return (
    <div className="bg-card text-card-foreground p-6 px-8 rounded-xl">
      <div className="flex justify-between gap-3 mb-8">
        <h5 className="font-bold text-xl">{title}</h5>
        <Image src={icon} alt={alt || title} width={65} height={65} />
      </div>
      <span className="text-4xl font-bold tabular-nums text-foreground">
        {value}
      </span>
    </div>
  );
}
