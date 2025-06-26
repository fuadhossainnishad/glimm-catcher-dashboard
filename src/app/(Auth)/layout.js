import { Flex } from "antd";
import ImageSlider from "./_components/ImageSlider";

export default function AuthLayout({ children }) {
  return (
    <main className="grid h-screen max-h-screen place-items-center overflow-auto bg-gradient-to-br from-primary/85 to-primary-yellow/25">
      <Flex
        align="stretch"
        justify="start"
        className="mx-auto max-h-[70vh] w-full rounded-xl bg-gray-100 shadow md:w-[85%] lg:w-3/4 xl:w-1/2"
      >
        <div className="xl:w-[38%]">
          <ImageSlider />
        </div>

        <div className="grid flex-1 place-items-center p-8">{children}</div>
      </Flex>
    </main>
  );
}
