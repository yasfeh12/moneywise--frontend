import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { PieChart, BarChart } from "react-native-gifted-charts";
import { LineChart } from "react-native-chart-kit";

import ToggleTheme from "../components/ToggleTheme";
import { ThemeContext } from "../utils/ThemeContext";
import apiClient from "../utils/API";

interface PieSpentvsSavingsData {
  value: number;
  color: string;
  text: string;
}

// // now dynamically loaded, could maybe get rid of this
// const pieSpentvsSavingsData: PieSpentvsSavingsData[] = [
//   { value: 60, color: "#2979FF", text: "spent" }, // 60% spent
//   { value: 40, color: "#00E5FF", text: "saved" }, // 40% saved
// ];
interface BarCategoriesData {
  value: number;
  label: string;
  frontColor: string;
}
const barCategoriesData: BarCategoriesData[] = [
  { value: 150, label: "Utilities", frontColor: "#2979FF" },
  { value: 200, label: "Food", frontColor: "#00E5FF" },
  { value: 100, label: "Entertainment", frontColor: "#FF4081" },
  { value: 80, label: "Transportation", frontColor: "#FFCA28" },
  { value: 700, label: "Housing", frontColor: "#4CAF50" },
  { value: 50, label: "Other", frontColor: "#9C27B0" },
  { value: 120, label: "Insurance", frontColor: "#FF5722" },
  { value: 90, label: "Health", frontColor: "#8BC34A" },
  { value: 70, label: "Childcare", frontColor: "#3F51B5" },
  { value: 60, label: "Clothing", frontColor: "#CDDC39" },
  { value: 130, label: "Groceries", frontColor: "#FF9800" },
  { value: 40, label: "Animal Care", frontColor: "#607D8B" },
];
interface BalanceOverTimeDataLineGraph {
  labels: string[];
  datasets: {
    data: number[];
    color: () => string;
    strokeWidth: number;
  }[]; //array of object
  legend: string[];
}
const balanceOverTimeData: BalanceOverTimeDataLineGraph = {
  labels: [
    "01 Sep", // +2400 salary
    "02 Sep", // - Mortgage
    "03 Sep", // - Starbucks
    "04 Sep", // -
    "01 Oct",
    "02 Oct",
  ],
  datasets: [
    {
      data: [2400, 1700, 1695, 1445, 2400, 1700],
      color: () => "#80FF00", // line of chart, colour
      strokeWidth: 2, //thickness of line
    },
  ],
  legend: ["Balance Over Time"],
};

const screenWidth = Dimensions.get("window").width; // get width of screen

const ReportScreen: React.FC = (): JSX.Element => {
  const [actualPieChartData, setActualPieChartData] = useState<
    PieSpentvsSavingsData[] | undefined
  >(undefined); // data for saved/spent pie chart
  const [actualEssentialPieChartData, setActualEssentialPieChartData] =
    useState<PieSpentvsSavingsData[] | undefined>(undefined); // data for essential/non-essential pie chart
  const [actualBarChartData, setActualBarChartData] = useState<
    BarCategoriesData[] | undefined
  >(undefined);
  const [actualLineGraphData, setActualLineGraphData] = useState<
    BalanceOverTimeDataLineGraph | undefined
  >(undefined);

  const [loading, setLoading] = useState<boolean>(true);
  const { theme, setTheme } = useContext(ThemeContext);

  const styles = createStyles(theme);

  useEffect(() => {
    let endpoint = "/reports/september";
    apiClient
      .get(endpoint)
      .then((response) => {
        console.log("response", response.data.reports.spentVsSaved);
        console.log("response temp");
        const saved = response.data.reports.spentVsSaved.saved;
        const spent = response.data.reports.spentVsSaved.spending;
        setActualPieChartData([
          { value: spent, color: "#2979FF", text: `${spent.toString()} spent` }, // % spent
          {
            value: saved,
            color: "#00E5FF",
            text: `${saved.toString()} saved`,
          }, // % saved
        ]);

        const essential =
          response.data.reports.essentialVsNonEssential.essential;
        const nonEssential =
          response.data.reports.essentialVsNonEssential.nonEssential;
        setActualEssentialPieChartData([
          {
            value: essential,
            color: "#2979FF",
            text: `${essential.toString()} essential`,
          },
          {
            value: nonEssential,
            color: "#00E5FF",
            text: `${nonEssential.toString()} nonEssential`,
          },
        ]);

        const { spendingByCategory } = response.data.reports;

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
        const barChartData: BarCategoriesData[] = Object.entries(
          spendingByCategory
        ).map(([key, value]: [string, number]) => {
          return {
            value: value,
            label: key,
            frontColor: colourForBarChart[key],
          };
        });

        setActualBarChartData(barChartData);
        // setActualBarChartData(
        //   [
        //   {
        //     value: spendingByCategory["utilities"],
        //     label: "Utilities",
        //     frontColor: "#2979FF",
        //   },
        //   { value: 200, label: "Food", frontColor: "#00E5FF" },
        //   { value: 100, label: "Entertainment", frontColor: "#FF4081" },
        //   { value: 80, label: "Transportation", frontColor: "#FFCA28" },
        //   { value: 700, label: "Housing", frontColor: "#4CAF50" },
        //   { value: 50, label: "Other", frontColor: "#9C27B0" },
        //   { value: 120, label: "Insurance", frontColor: "#FF5722" },
        //   { value: 90, label: "Health", frontColor: "#8BC34A" },
        //   { value: 70, label: "Childcare", frontColor: "#3F51B5" },
        //   { value: 60, label: "Clothing", frontColor: "#CDDC39" },
        //   { value: 130, label: "Groceries", frontColor: "#FF9800" },
        //   { value: 40, label: "Animal Care", frontColor: "#607D8B" },
        // ]);

        const varLabels = Object.keys(response.data.reports.dailyBalances);
        const varDatasets = Object.values(
          response.data.reports.dailyBalances
        ).map((dataSetItem: any) => {
          // edit ANY, amd put specific type
          return dataSetItem.balance;
        });

        const balanceOverTimeData2: BalanceOverTimeDataLineGraph = {
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

        setActualLineGraphData(balanceOverTimeData2);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error", error);
        setLoading(false);
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Monthly Financial Report 1</Text>
      </View>

      <Text style={styles.title}>Monthly Financial Report 1</Text>

      <View style={styles.chartContainer}>
        <Text style={styles.title}>Pie Chart - Amount Saved</Text>
        {loading ? (
          <Text style={{ color: "white", fontSize: 20 }}>Loading...</Text>
        ) : actualPieChartData ? (
          <PieChart
            data={actualPieChartData || []} // when undefined, array
            donut
            showText={true}
            radius={120}
            innerRadius={50}
            textColor={theme === "light" ? "#000000" : "#FFFFFF"}
            textSize={18}
            innerCircleColor="#000F0C" // matches background color in stylesheet below
            strokeWidth={6} // Add this to create the overlap gap
            strokeColor={"#000F0C"}
          />
        ) : (
          <Text>No data found...</Text>
        )}
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Pie Chart - Essential vs Non-Essential</Text>
        {loading ? (
          <Text style={{ color: "white", fontSize: 20 }}>Loading...</Text>
        ) : actualPieChartData ? (
          <PieChart
            data={actualEssentialPieChartData || []} // when undefined, array
            donut
            showText={true}
            radius={120}
            innerRadius={50}
            textColor={theme === "light" ? "#000000" : "#FFFFFF"}
            textSize={18}
            innerCircleColor="#000F0C" // matches background color in stylesheet below
            strokeWidth={6} // Add this to create the overlap gap
            strokeColor={"#000F0C"}
          />
        ) : (
          <Text>No data found...</Text>
        )}
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Bar Chart - Expenses/ Category</Text>
        {loading ? (
          <Text style={{ color: "white", fontSize: 20 }}>Loading...</Text>
        ) : (
          <BarChart
            data={actualBarChartData || []}
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
        )}
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Line Graph - Balance over time</Text>
        <Text style={styles.title}>Bar Chart - Expenses/ Category</Text>
        {loading ? (
          <Text style={{ color: "white", fontSize: 20 }}>Loading...</Text>
        ) : (
          <LineChart
            data={actualLineGraphData} // NEED TO FIX TYPESCRIPT ERROR!!!!!!!!!!!!
            width={screenWidth - 40}
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
          backgroundColor: "#000F0C",
        },
        title: {
          fontSize: 24,
          fontWeight: "bold",
          color: "inherit",
        },
        chartContainer: {
          marginBottom: 40,
          marginHorizontal: 10,
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
          color: "inherit",
        },
        chartContainer: {
          marginBottom: 40,
          marginHorizontal: 10,
        },
      });
};

export default ReportScreen;
