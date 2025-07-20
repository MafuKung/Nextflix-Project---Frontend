import Image from "next/image";
import HeroBanner from './presentation/sections/HeroBanner'
import SectionRow from './presentation/sections/SectionRow'

export default function Home() {
  return (
    <>
    <HeroBanner />
    <main className="pt-16">
      {/* TODO: ใส่ SectionRow ต่อในลำดับถัดไป */}

      <SectionRow
        title="Popular on Nextflix"
        queryKey="popular"
        endpoint="popular"
      />

      <SectionRow
        title="Top Rated"
        queryKey="topRated"
        endpoint="top-rated"
      />

      <SectionRow
        title="Coming Soon"
        queryKey="upcoming"
        endpoint="upcoming"
      />

    </main>
    </>
  );
}


