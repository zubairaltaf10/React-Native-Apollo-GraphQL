import React from "react";
import { View, Text, Image } from "react-native";
import { width, height } from "react-native-dimension";
import { Toast } from "native-base";
import { withAuth } from "../../store/hoc/withAuth";
class InGredentsInput extends React.Component {

  constructor(props) {
    super(props);
  }

render() {
    return (
      <View style={{ flex: 1, paddingTop:"50%"  }}>
        
       <Text style={{ textAlign: "center" , textAlignVertical: "center" }}>App Home, TBC </Text>
      </View>
    );
  }
}
export default withAuth(InGredentsInput);