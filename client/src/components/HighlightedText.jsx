const HighlightedText = ({ text }) => {
  return (
    <span className="bg-gradient-to-r from-[#ac2acc] via-[#d47fbc] to-[#d7384d] text-transparent bg-clip-text font-bold">
      {" "}
      {text}{" "}
    </span>
  );
};

export default HighlightedText;
