import { ServiceLanding, serviceMetadata } from "@/components/service-landing";

export const metadata = serviceMetadata("id");

export default function JasaPembuatanWebsitePage() {
  return <ServiceLanding locale="id" />;
}
