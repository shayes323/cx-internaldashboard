import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

import React from "react";
import { stateStoreContext } from "../StateStore";
import { useContext } from "react";
import { observer } from "mobx-react-lite";

export const Charts: any = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);
  return (
    <div>
      <span>
        <LineChart
          width={600}
          height={200}
          data={stateStore.responseData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="zone_id" stroke="#8884d8" />
        </LineChart>
      </span>
      <span>
        <BarChart width={600} height={200} data={stateStore.responseData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="rtb_pub_requests" fill="#8884d8" />
        </BarChart>
      </span>
    </div>
  );
});
