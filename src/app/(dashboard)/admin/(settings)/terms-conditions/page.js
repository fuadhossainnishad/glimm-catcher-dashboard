import { getSettings } from "@/features/settings";
import TermsConditionsContainer from "./_components/TermsConditionsContainer";

export const metadata = {
  title: "Terms & Conditions",
  description: "Admin terms & conditions page",
};

export default async function TermsConditionsPage() {
  const res = await getSettings();
  const settings = res?.data?.data || {};
  return (
    <TermsConditionsContainer termsAndCondition={settings.termsAndCondition} />
  );
}
