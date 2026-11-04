import { ServiceLanding, serviceMetadata } from "@/components/service-landing";

export const metadata = serviceMetadata("en");

export default function WebsiteDesignServicesPage() {
  return <ServiceLanding locale="en" />;
}
