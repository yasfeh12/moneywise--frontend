import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { PieChart, BarChart } from "react-native-gifted-charts";
import { LineChart } from "react-native-chart-kit";

import ToggleTheme from "../components/ToggleTheme";
import { ThemeContext } from "../utils/ThemeContext";
import apiClient from "../utils/API";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentMonth = months[new Date().getMonth()].toLowerCase();

interface PieSpentvsSavingsData {
  value: number;
  color: string;
  text: string;
}

interface BarCategoriesData {
  value: number;
  label: string;
  frontColor: string;
}

interface BalanceOverTimeDataLineGraph {
  labels: string[];
  datasets: {
    data: number[];
    color: () => string;
    strokeWidth: number;
  }[]; //array of object
  legend: string[];
}

const screenWidth = Dimensions.get("window").width; // get width of screen

const ReportScreen: React.FC = (): JSX.Element => {
  const [reportsData, setReportsData] = useState<any>({});
  const [month, setMonth] = useState(currentMonth);
  const [loading, setLoading] = useState<boolean>(true);
  const { theme, setTheme } = useContext(ThemeContext);

  const styles = createStyles(theme);

  let spentVsSavedPieData: PieSpentvsSavingsData[] = [];
  let essentialVsNonEssentialPieData: PieSpentvsSavingsData[] = [];
  let barChartData: BarCategoriesData[] = [];
  let balanceOverTimeData: BalanceOverTimeDataLineGraph | {} = {};

  useEffect(() => {
    let endpoint = `/reports/${month}`;
    setLoading(true);
    apiClient
      .get(endpoint)
      .then((response) => {
        setReportsData(response.data.reports);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error", error);
        setLoading(false);
      });
  }, [month]);

  if (!loading && reportsData) {
    spentVsSavedPieData = [
      {
        value: reportsData?.spentVsSaved?.spending,
        color: "#2979FF",
        text: `£${reportsData?.spentVsSaved?.spending?.toString()}`,
      }, // % spent
      {
        value: reportsData?.spentVsSaved?.saved,
        color: "#00E5FF",
        text: `£${reportsData?.spentVsSaved?.saved?.toString()}`,
      }, // % saved
    ];

    essentialVsNonEssentialPieData = [
      {
        value: reportsData?.essentialVsNonEssential?.essential,
        color: "#2979FF",
        text: `£${reportsData?.essentialVsNonEssential?.essential?.toString()}`,
      },
      {
        value: reportsData?.essentialVsNonEssential?.nonEssential,
        color: "#00E5FF",
        text: `£${reportsData?.essentialVsNonEssential?.nonEssential?.toString()}`,
      },
    ];

    const colourForBarChart: { [key: string]: string } = {
      utilities: "#2979FF",
      food: "#00E5FF",
      entertainment: "#FF4081",
      transportation: "#FFCA28",
      housing: "#4CAF50",
      other: "#9C27B0",
      insurance: "#FF5722",
      health: "#8BC34A",
      childcare: "#3F51B5",
      clothing: "#CDDC39",
      groceries: "#FF9800",
      "animal care": "#607D8B",
    };

    barChartData = Object.entries(reportsData?.spendingByCategory).map(
      ([key, value]: [string, number]) => {
        return {
          value: value,
          label: key,
          frontColor: colourForBarChart[key],
        };
      }
    );

    const varLabels = Object.keys(reportsData?.dailyBalances);
    const varDatasets = Object.values(reportsData?.dailyBalances).map(
      (dataSetItem: any) => {
        // edit ANY, amd put specific type
        return dataSetItem.balance;
      }
    );

    balanceOverTimeData = {
      labels: varLabels,
      datasets: [
        {
          data: varDatasets,
          color: () => "#80FF00", // line of chart, colour
          strokeWidth: 2, //thickness of line
        },
      ],
      legend: ["Balance Over Time"],
    };
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Monthly Financial Report</Text>
      </View>

      <Picker
        selectedValue={month}
        style={styles.picker}
        onValueChange={(itemValue: any) => setMonth(itemValue)}
      >
        {months.map((month) => (
          <Picker.Item key={month} label={month} value={month.toLowerCase()} />
        ))}
      </Picker>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Amount saved vs amount spent</Text>
        {loading ? (
          <Text style={{ color: "white", fontSize: 20 }}>Loading...</Text>
        ) : reportsData ? (
          <>
            <PieChart
              data={spentVsSavedPieData || []} // when undefined, array
              donut
              showText={true}
              radius={120}
              innerRadius={50}
              textColor={"#000000"}
              font="sans-serif"
              textSize={12}
              innerCircleColor="transparent" // matches background color in stylesheet below
              strokeWidth={2} // Add this to create the overlap gap
              strokeColor={"#000"}
              showTextBackground
              textBackgroundRadius={26}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  padding: 5,
                  backgroundColor: "#2979FF",
                  borderRadius: 5,
                  width: 20,
                  height: 20,
                }}
              ></View>
              <Text style={{ color: "white", marginRight: 20 }}> Spent</Text>
              <View
                style={{
                  padding: 5,
                  backgroundColor: "#00E5FF",
                  borderRadius: 5,
                  width: 20,
                  height: 20,
                }}
              ></View>
              <Text style={{ color: "white" }}> Saved</Text>
            </View>
          </>
        ) : (
          <Text style={{ color: "white" }}>No data found...</Text>
        )}
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Essential vs non-essential</Text>
        {loading ? (
          <Text style={{ color: "white", fontSize: 20 }}>Loading...</Text>
        ) : reportsData ? (
          <>
            <PieChart
              data={essentialVsNonEssentialPieData || []} // when undefined, array
              donut
              showText={true}
              radius={120}
              innerRadius={50}
              textColor={"#000000"}
              font="sans-serif"
              textSize={12}
              innerCircleColor="transparent" // matches background color in stylesheet below
              strokeWidth={2} // Add this to create the overlap gap
              strokeColor={"#000"}
              showTextBackground
              textBackgroundRadius={26}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  padding: 5,
                  backgroundColor: "#2979FF",
                  borderRadius: 5,
                  width: 20,
                  height: 20,
                }}
              ></View>
              <Text style={{ color: "white", marginRight: 20 }}>
                {" "}
                Essential
              </Text>
              <View
                style={{
                  padding: 5,
                  backgroundColor: "#00E5FF",
                  borderRadius: 5,
                  width: 20,
                  height: 20,
                }}
              ></View>
              <Text style={{ color: "white" }}> Non-essential</Text>
            </View>
          </>
        ) : (
          <Text style={{ color: "white" }}>No data found...</Text>
        )}
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Expenses by category</Text>
        {loading ? (
          <Text style={{ color: "white", fontSize: 20 }}>Loading...</Text>
        ) : reportsData ? (
          <BarChart
            data={barChartData || []}
            barWidth={30}
            barBorderRadius={5}
            // height={300} // works without eight
            yAxisThickness={0}
            xAxisThickness={1}
            noOfSections={6}
            // maxValue={300} // hardcoded, should require in data
            initialSpacing={20}
            width={screenWidth - 40}
            xAxisLabelTextStyle={{
              fontSize: 10,
              color: `${theme === "light" ? "#000000" : "#FFFFFF"}`,
            }}
            rotateLabel={true} // rotate x axis labels
            yAxisLabelTexts={["0", "60", "120", "180", "240", "300"]}
            yAxisTextStyle={{ color: "white" }}
          />
        ) : (
          <Text style={{ color: "white" }}>No data found...</Text>
        )}
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Balance over time</Text>
        {loading ? (
          <Text style={{ color: "white", fontSize: 20 }}>Loading...</Text>
        ) : reportsData ? (
          <LineChart
            data={balanceOverTimeData} // NEED TO FIX TYPESCRIPT ERROR!!!!!!!!!!!!
            width={screenWidth - 80}
            height={220}
            chartConfig={{
              backgroundColor: "#000F0C",
              backgroundGradientFrom: "#000F0C",
              backgroundGradientTo: "#000F0C",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(128, 255, 0, ${opacity})`, // opacity below this line
              labelColor: () => "white",
              // style: {
              //   borderRadius: 15,
              // },
              propsForDots: {
                r: "5",
                strokeWidth: "2",
                stroke: "orange",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              // borderRadius: 16,
            }}
          />
        ) : (
          <Text style={{ color: "white" }}>No data found...</Text>
        )}
      </View>
      {/* Footer */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <ToggleTheme />
      </View>
    </ScrollView>
  );
};

const createStyles = (theme: string) => {
  return theme === "light"
    ? StyleSheet.create({
        scrollContainer: {
          paddingVertical: 20,
          paddingHorizontal: 10,

          backgroundColor: "#00C293",
          color: "#000000",
        },

        container: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",

          backgroundColor: "#00C293",
        },
        title: {
          fontSize: 24,
          fontWeight: "900",
          marginBottom: 20,

          color: "white",
        },
        chartContainer: {
          marginBottom: 40,
          marginHorizontal: 10,
          overflow: "hidden",
          borderWidth: 2,
          borderRadius: 15,
          padding: 10,
          paddingBottom: 50,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

          borderColor: "white",
          backgroundColor: "#636363",
        },
        chartTitle: {
          fontSize: 20,
          fontWeight: "600",
          marginBottom: 20,

          color: "#00C293",
        },
        picker: {
          height: 50,
          backgroundColor: "#535353",
          borderRadius: 12,
          marginBottom: 20,
          color: "white",
          marginLeft: 10,
          marginRight: 10,
        },
      })
    : StyleSheet.create({
        scrollContainer: {
          paddingVertical: 20,
          paddingHorizontal: 10,

          backgroundColor: "#000F0C",
          color: "#FFFFFF",
        },

        container: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",

          backgroundColor: "#000F0C",
        },
        title: {
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,

          color: "white",
        },
        chartContainer: {
          marginBottom: 40,
          marginHorizontal: 10,
          overflow: "hidden",
          borderWidth: 2,
          borderRadius: 15,
          padding: 10,
          paddingBottom: 50,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

          borderColor: "white",
        },
        chartTitle: {
          fontSize: 20,
          fontWeight: "600",
          marginBottom: 20,

          color: "white",
        },
        picker: {
          height: 50,
          backgroundColor: "#535353",
          borderRadius: 12,
          marginBottom: 20,
          color: "white",
          marginLeft: 10,
          marginRight: 10,
        },
      });
};

export default ReportScreen;
