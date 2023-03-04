import Tableau from "tableau-react";
import { useEffect } from "react";

function HomeDashboard() {
  const options = {
    hideTabs: true,
    hideToolbar: true,
  };

  return (
    <Tableau
      url="https://public.tableau.com/views/MetroVancouverHouseTransactionDashboard/VancouverHomeMainDashboard?:language=en-US&:display_count=n&:origin=viz_share_link"
      options={options}
    />
  );
}

export default HomeDashboard;
