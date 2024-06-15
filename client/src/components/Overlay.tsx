import "./componentStyles/Overlay.css";

export default function Overlay(props: { display: boolean }) {
  return (
    <>
      <div class="overlay" style={(!props.display) ? "display: none;" : ""}></div>
    </>
  );
}
