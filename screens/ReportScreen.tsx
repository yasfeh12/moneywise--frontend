import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { PieChart, BarChart } from "react-native-gifted-charts";
import { LineChart } from "react-native-chart-kit";
import { StringLiteral } from "typescript";

interface PieSavingsData {
  value: number;
  color: string;
  text: string;
}
const pieSavingsData: PieSavingsData[] = [
  { value: 47, color: "#2979FF", text: "spent" }, // 60% spent
  { value: 53, color: "#00E5FF", text: "saved" }, // 40% saved
];
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
  { value: 300, label: "Housing", frontColor: "#4CAF50" },
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
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Monthly Financial Report 1</Text>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Pie Chart - Amount Saved</Text>
        <PieChart
          data={pieSavingsData}
          donut
          showText={true}
          radius={120}
          innerRadius={50}
          textColor={"#FFFFFF"}
          textSize={18}
          innerCircleColor="#000F0C" // matches background colour in stylesheet below
          strokeWidth={6} // Add this to create the overlap effect
          strokeColor={"#000F0C"}
        />
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Bar Chart - Expenses/ Category</Text>
        <BarChart
          data={barCategoriesData}
          barWidth={30}
          barBorderRadius={5}
          height={300}
          yAxisThickness={0}
          xAxisThickness={1}
          noOfSections={6}
          maxValue={300}
          initialSpacing={20}
          width={screenWidth - 40}
          xAxisLabelTextStyle={{ fontSize: 10, color: "white" }}
          rotateLabel={true} // rotate x axis labels
          yAxisLabelTexts={["0", "60", "120", "180", "240", "300"]}
          yAxisTextStyle={{ color: "white" }}
        />
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Line Graph - Balance over time</Text>
        <LineChart
          data={balanceOverTimeData}
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#000F0C",
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
    color: "#80FF00",
  },
  chartContainer: {
    marginBottom: 40,
    marginHorizontal: 10,
  },
});

export default ReportScreen;
