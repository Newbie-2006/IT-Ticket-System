import ITAssistApp from "../../components/ITAssistApp";

export default function Page({ params }: { params: { path?: string[] } }) {
  return <ITAssistApp initialPath={`/${params.path?.join("/") ?? ""}`} />;
}
