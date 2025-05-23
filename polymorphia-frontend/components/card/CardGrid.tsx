import Card from "./Card";

export default function CardGrid() {
  return <div className="w-full md:w-fit grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
    <Card title="Kartkówka 1" subtitle="Interfejsy i mapy" xp="3,5 xp" link="/" />
    <Card title="Kartkówka 2" subtitle="Jak to jest być skrybą, dobrze? To nie ma tak, że dobrze, albo że niedobrze" xp="10 xp" link="/" />
    <Card title="Kartkówka 3" xp="3 xp" link="/" />
    <Card title="Kartkówka 4" xp="1,1 xp" link="/" />
    <Card title="Kartkówka 5" subtitle="Lorem ipsum" xp="8 xp" link="/" />
    <Card title="Kartkówka 6" subtitle="Dolor sit amet" xp="2 xp" link="/" />
    <Card title="Kartkówka 7" subtitle="Typy generyczne" xp="4 xp" link="/" />
    <Card title="Kartkówka 8" subtitle="Dziedziczenie i polimorfizm" xp="6 xp" link="/" />
    <Card title="Kartkówka 9" subtitle="Funkcje wyższego rzędu" xp="5 xp" link="/" />
    <Card title="Kartkówka 10" subtitle="Rekurencja" xp="7 xp" link="/" />
    <Card title="Kartkówka 11" subtitle="Algorytmy sortowania" xp="9 xp" link="/" />
    <Card title="Kartkówka 12" subtitle="Struktury danych" xp="3 xp" link="/" />
  </div>
}