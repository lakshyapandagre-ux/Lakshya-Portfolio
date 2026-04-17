interface HeroNameProps {
  name: string;
}

export default function HeroName({ name }: HeroNameProps) {
  return (
    <h1 className="hero__name--upgraded">
      {name}
    </h1>
  );
}
