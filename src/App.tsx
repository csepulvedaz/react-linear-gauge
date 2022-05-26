const COLORS = {
  orange: "#FF8D0A",
  green: "#3DE155",
  yellow: "#FFDE0A",
  orangeLigth: "#FFA947",
  greenLigth: "#62e776",
  yellowLigth: "#FFE53B",
};

const CHECK_ICON = (
  <svg
    viewBox="0 0 1000 1000"
    focusable="false"
    width="2.1em"
    height="2.1em"
    fill="black"
  >
    <path
      fill="black"
      d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
    />
    <path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" />
  </svg>
);

const WARNING_ICON = (
  <svg
    viewBox="0 0 1000 1000"
    focusable="false"
    width="2.1em"
    height="2.1em"
    fill="black"
  >
    <path
      fill="#black"
      d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
    />
    <path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" />
  </svg>
);

const getPercentage = (metric: number): string => {
  return (metric * 100) / 100 + "%";
};

const getBallCoolor = (isInRange: boolean, value: number): string => {
  if (isInRange) return COLORS.green;
  if (value > 50) return COLORS.yellow;
  return COLORS.orange;
};

const gradientStop = (value: number, color: string) => (
  <stop offset={getPercentage(value)} stopColor={color} stopOpacity="1"></stop>
);

const svgGradient = (min: number, max: number, title: string) => (
  <g>
    <linearGradient
      id={`gradient-${title}`}
      x1="0%"
      y1="0%"
      x2="100%"
      y2="0%"
      spreadMethod="pad"
    >
      {gradientStop(min, COLORS.orangeLigth)}
      {gradientStop(min, COLORS.greenLigth)}
      {gradientStop(max, COLORS.greenLigth)}
      {gradientStop(max, COLORS.yellowLigth)}
    </linearGradient>
  </g>
);

const svgRect = (title: string) => (
  <g>
    <rect
      x="1"
      y="25%"
      rx="8"
      ry="8"
      width="99.5%"
      height={15}
      stroke="black"
      stroke-opacity="1"
      stroke-width="2"
      fill={`url(#gradient-${title})`}
    ></rect>
  </g>
);

const svgIcon = (value: number, transformvalue: number, isInRange: boolean) => (
  <g transform={`translate(${transformvalue},-0.5)`}>
    <circle
      cx="17"
      cy="17"
      r="15"
      fill={getBallCoolor(isInRange, value)}
    ></circle>
    {isInRange ? CHECK_ICON : WARNING_ICON}
  </g>
);

const ReactLinearGauge = ({
  value = 30,
  range = [20, 80],
  title = "Title",
}) => {
  const width = 500;
  const [min, max] = range;
  const transformvalue = (value * width) / 100;
  const isInRange = value >= min && value <= max;

  return (
    <div>
      <div style={{ fontWeight: "bold" }}>{title}</div>
      <div>
        <svg width={width} height={35}>
          {svgGradient(min, max, title)}
          {svgRect(title)}
          {svgIcon(value, transformvalue, isInRange)}
        </svg>
      </div>
      <div
        style={{
          width: width,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>0</div>
        <div>100</div>
      </div>
    </div>
  );
};

export default ReactLinearGauge;
