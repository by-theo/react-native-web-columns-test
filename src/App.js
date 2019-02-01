import React, { Component } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Columns from "react-columns";

class App extends Component {
  state = {
    window: Dimensions.get("window")
  };

  handler = dims => this.setState(dims);

  componentWillMount() {
    Dimensions.addEventListener("change", this.handler);
  }

  componentWillUnmount() {
    // Important to stop updating state after unmount
    Dimensions.removeEventListener("change", this.handler);
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
    const { width } = this.state.window;
    const gap = 20;
    const columns = 3;
    const itemSide = (width - gap * 4) / columns;
    const styles = StyleSheet.create({
      app: {
        marginHorizontal: gap + "px"
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
        <Columns columns={columns.toString()} gap={gap + "px"}>
          {this.renderItems(styles.item)}
        </Columns>
      </View>
    );
  }
}

export default App;
