import { infos } from "@/config/landing";
import Features from "@/components/sections/features";
import HeroLanding from "@/components/sections/hero-landing";
import InfoLanding from "@/components/sections/info-landing";
import PreviewLanding from "@/components/sections/preview-landing";
import Testimonials from "@/components/sections/testimonials";

export default function IndexPage() {
  return (
    <>
      <HeroLanding />
      <PreviewLanding />
      <InfoLanding data={infos[0]} reverse={true} />
      <Features />
      <Testimonials />
    </>
  );
}
