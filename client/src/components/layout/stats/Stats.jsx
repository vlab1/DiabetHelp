import React, { useState, useContext, useCallback, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import { Box } from "@mui/material";
import Loader from "../../layout/loader/Loader";
import CardStats from "./CardStats";
import Weight7 from "../../images/png/stats/weight7.png";
import Glucose7 from "../../images/png/stats/glucose-meter7.png";
import Weight30 from "../../images/png/stats/weight30.png";
import Glucose30 from "../../images/png/stats/glucose-meter30.png";
import Weight365 from "../../images/png/stats/weight365.png";
import Glucose365 from "../../images/png/stats/glucose-meter365.png";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Stats = ({ records, formatDate }) => {
  const [statistics, setStatistics] = useState([]);
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [isLoading, setIsLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const { t } = useTranslation();
  
  const fetchStatistics = useCallback(async () => {
    try {
      await request("/api/record/statistics", "GET", null, null, {
        Authorization: `Bearer ${auth.token}`,
      })
        .then((res) => {
          setStatistics(res.data);
        })
        .then(async () => {
          const data = await request(
            "/api/account/premium/status",
            "GET",
            null,
            null,
            {
              Authorization: `Bearer ${auth.token}`,
            }
          );
          setIsPremium(data.data);
          setIsLoading(false);
        });
    } catch (e) {}
  }, [request, auth]);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  return !isLoading ? (
    <div style={{ display: "grid", gap: "5vh" }}>
      <div style={{ display: "flex", gap: "5vh", marginLeft: "15vh" }}>
        <div>
          <CardStats
            img={Glucose7}
            title={t("glucose_data")}
            titleTimeSpan={t("weekly")}
            value={"glucose"}
            countRecords={statistics.weeklyNumberRecords}
            maximum={statistics.weeklyMaximumGlucose}
            minimum={statistics.weeklyMinimumGlucose}
            title01={t("max_glucose")}
            title02={t("meas_data")}
            title03={t("comment")}
            title11={t("min_glucose")}
            title12={t("meas_data")}
            title13={t("comment")}
            formatDate={formatDate}
          />
        </div>
        <div>
          <CardStats
            img={Weight7}
            title={t("weight_data")}
            titleTimeSpan={t("weekly")}
            value={"weight"}
            countRecords={statistics.weeklyNumberRecords}
            maximum={statistics.weeklyMaximumWeight}
            minimum={statistics.weeklyMinimumWeight}
            title01={t("max_weight")}
            title02={t("meas_data")}
            title03={t("comment")}
            title11={t("min_weight")}
            title12={t("meas_data")}
            title13={t("comment")}
            formatDate={formatDate}
          />
        </div>
      </div>
      {isPremium && (
        <div style={{ display: "flex", gap: "5vh", marginLeft: "15vh" }}>
          <div>
            <CardStats
              img={Glucose30}
              title={t("glucose_data")}
              titleTimeSpan={t("monthly")}
              value={"glucose"}
              countRecords={statistics.monthNumberRecords}
              maximum={statistics.monthMaximumGlucose}
              minimum={statistics.monthMinimumGlucose}
              title01={t("max_glucose")}
              title02={t("meas_data")}
              title03={t("comment")}
              title11={t("min_glucose")}
              title12={t("meas_data")}
              title13={t("comment")}
              formatDate={formatDate}
            />
          </div>
          <div>
            <CardStats
              img={Weight30}
              title={t("weight_data")}
              titleTimeSpan={t("monthly")}
              value={"weight"}
              countRecords={statistics.monthNumberRecords}
              maximum={statistics.monthMaximumWeight}
              minimum={statistics.monthMinimumWeight}
              title01={t("max_weight")}
              title02={t("meas_data")}
              title03={t("comment")}
              title11={t("min_weight")}
              title12={t("meas_data")}
              title13={t("comment")}
              formatDate={formatDate}
            />
          </div>
        </div>
      )}
      {isPremium && (
        <div
          style={{
            display: "flex",
            gap: "5vh",
            marginLeft: "15vh",
            marginBottom: "5vh",
          }}
        >
          <div>
            <CardStats
              img={Glucose365}
              title={t("glucose_data")}
              titleTimeSpan={t("yearly")}
              value={"glucose"}
              countRecords={statistics.yearNumberRecords}
              maximum={statistics.yearMaximumGlucose}
              minimum={statistics.yearMinimumGlucose}
              title01={t("max_glucose")}
              title02={t("meas_data")}
              title03={t("comment")}
              title11={t("min_glucose")}
              title12={t("meas_data")}
              title13={t("comment")}
              formatDate={formatDate}
            />
          </div>
          <div>
            <CardStats
              img={Weight365}
              title={t("weight_data")}
              titleTimeSpan={t("yearly")}
              value={"weight"}
              countRecords={statistics.yearhNumberRecords}
              maximum={statistics.yearMaximumWeight}
              minimum={statistics.yearMinimumWeight}
              title01={t("max_weight")}
              title02={t("meas_data")}
              title03={t("comment")}
              title11={t("min_weight")}
              title12={t("meas_data")}
              title13={t("comment")}
              formatDate={formatDate}
            />
          </div>
        </div>
      )}
      {!isPremium && (
        <div
          style={{
            display: "flex",
            gap: "5vh",
            marginLeft: "15vh",
            marginBottom: "5vh",
          }}
        >
          <div  style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: "50vh",
            marginTop: "15vh",
            marginBottom: "5vh",
          }}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              paragraph={true}
            >
              {t("buy_premium1")}
            </Typography>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ ml: 90, mt: -25 }}
    >
      <Loader></Loader>
    </Box>
  );
};

export default Stats;
