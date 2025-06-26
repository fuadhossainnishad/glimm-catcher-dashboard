import NextTopLoader from "nextjs-toploader";

export default function NextJsTopLoader() {
  return (
    <NextTopLoader
      color="linear-gradient(180deg, #db92fe 0%, #fbc774 100%)"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={true}
      easing="ease"
      speed={200}
      shadow="0 0 10px #db92fe,0 0 5px #000"
    />
  );
}
