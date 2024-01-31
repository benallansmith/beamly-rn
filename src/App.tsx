/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import Header from "./components/Header";

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
