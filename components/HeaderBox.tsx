const HeaderBox = ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  return (
    <div className="header-box ">
      <h1 className="header-box-title font-extrabold text-2xl">
        {title}
        {type === "greeting" && (
          <span className="text-bankGradient">&nbsp;{user}</span>
        )}
      </h1>
      <p className="header-box-subtext font-semibold">{subtext}</p>
    </div>
  );
};

export default HeaderBox;
