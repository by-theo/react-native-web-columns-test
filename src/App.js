import React, { Component } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Columns from "react-columns";

const minItemWidth = 280;
const gap = 20;

class App extends Component {
  constructor(props) {
    super(props);
    const window = Dimensions.get("window");
    const measurements = this.calculateMeasurements({ window });
    this.state = {
      window,
      ...measurements
    };
  }

  componentWillMount() {
    Dimensions.addEventListener("change", this.handler);
  }

  componentWillUnmount() {
    // Important to stop updating state after unmount
    Dimensions.removeEventListener("change", this.handler);
  }

  handler = dims => {
    const measurements = this.calculateMeasurements(dims);
    this.setState({
      ...dims,
      ...measurements
    });
  };

  calculateMeasurements(dims) {
    const { width } = dims.window;

    const bodyWidth = width;
    let columns = 3;
    let itemSide = (bodyWidth - gap * 4) / columns;
    // minimum width for 3 columns
    const columns3 = minItemWidth * 3 + gap * 4;

    // minimum width for 2 columns
    const columns2 = minItemWidth * 2 + gap * 3;

    // Handle 2 columns
    if (bodyWidth <= columns3 && bodyWidth > columns2) {
      columns = 2;
      itemSide = (bodyWidth - gap * 3) / columns;
    } else if (bodyWidth <= columns2) {
      columns = 1;
      // Keep each item width at a minumum of minItemWidth
      if (bodyWidth < minItemWidth + gap * 2) {
        itemSide = minItemWidth;
      } else {
        itemSide = bodyWidth - gap * 2;
      }
    }

    return {
      itemSide,
      columns
    };
  }

  renderItems(style) {
    const itemViews = [];
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    for (let i = 0; i < items.length; i++) {
      itemViews.push(<View key={i} style={style} />);
    }
    return itemViews;
  }

  render() {
    const { columns, itemSide } = this.state;
    const styles = StyleSheet.create({
      app: {
        marginHorizontal: gap + "px",
        alignItems: "center"
      },
      item: {
        width: itemSide,
        height: itemSide,
        backgroundColor: "tomato",
        marginBottom: gap
      }
    });
    return (
      <View style={styles.app}>
        <Columns columns={columns} gap={gap + "px"}>
          {this.renderItems(styles.item)}
        </Columns>
      </View>
    );
  }
}

export default App;
