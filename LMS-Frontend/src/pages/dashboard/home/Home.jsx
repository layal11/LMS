import Chart from "../../../components/dashboard/chart/Chart";
import FeaturedInfo from "../../../components/dashboard/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../../dummyData";
// import WidgetSm from "../../../components/dashboard/widgetSm/WidgetSm";
// import WidgetLg from "../../../components/dashboard/widgetLg/WidgetLg";

export default function Home() {
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userData}
        title="Attendance Analytics"
        grid
        dataKey="Active User"
      />
      {/* <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div> */}
    </div>
  );
}
